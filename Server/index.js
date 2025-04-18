import express from "express";
import fs from "fs";
import path from "path";
import os from "os";
import cors from "cors";
import connectDB from "./db.js";
import PostModel from "./models/postModel.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import linkInfoModel from "./models/linkInfoModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getLocalIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const interfaceName in interfaces) {
    for (const addressInfo of interfaces[interfaceName]) {
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        ips.push(addressInfo.address);
      }
    }
  }
  return ips;
};

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

connectDB();

// app.use(cors());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public", "backgrounds_pixiv")));

app.use("/images", express.static(path.join(__dirname, "public", "backgrounds_bigknight53")));

app.use("/images", express.static(path.join(__dirname, "public", "friend")));

app.get("/api/random-image", (req, res) => {
  try {
    const source = req.query.source || "pixiv";
    const imageDir = path.join(__dirname, "public", `backgrounds_${source}`);
    const files = fs.readdirSync(imageDir);

    if (files.length === 0) {
      return res.status(404).json({ error: "No images found" });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.json({
      imageUrl: `/images/${randomFile}`,
      filename: randomFile,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/create", async (req, res) => {
  try {
    const { title, imageUrl, content, heat, comments, likes, tags } = req.body;

    const newPost = new PostModel({
      title,
      imageUrl,
      content,
      heat,
      comments,
      likes,
      tags,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({
      error: error.message || "Failed to create post",
    });
  }
});

app.get("/api/getlinkinfos", async (req, res) => {
  try {
    const links = await linkInfoModel.find().lean();
    res.status(200).json(links);
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch friend links",
    });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    // 分页参数
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = Math.min(limit, 100); // 防止过大请求

    // 排序参数（-表示倒序）
    const sortBy = req.query.sort || "-createdAt";

    // 过滤参数
    const filters = {};
    // 按标签过滤
    if (req.query.tags) {
      filters.tags = { $in: req.query.tags.split(",") };
    }
    // 按标题过滤
    if (req.query.search) {
      filters.title = { $regex: req.query.search, $options: "i" }; // 不区分大小写的模糊匹配
    }

    // 数据库查询
    const [posts, total] = await Promise.all([
      PostModel.find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortBy),
      PostModel.countDocuments(filters),
    ]);

    res.status(200).json({
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Failed to fetch posts",
    });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    // 从 URL 参数中获取帖子 ID
    const postId = req.params.id;

    // 使用 Mongoose 的 findById 方法查找帖子
    // .select('-__v') 是可选的，用于从结果中排除 Mongoose 的版本键
    const post = await PostModel.findById(postId).select("-__v");

    // 如果找不到帖子，返回 404 Not Found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 如果找到帖子，返回 200 OK 和帖子数据
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);

    // 如果 ID 格式无效 (例如，不是有效的 ObjectId)，Mongoose 会抛出 CastError
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    // 其他服务器错误，返回 500 Internal Server Error
    res.status(500).json({
      error: error.message || "Failed to fetch post",
    });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    // 使用 Mongoose 的 distinct 方法获取所有唯一标签
    const tags = await PostModel.distinct("tags");

    // 过滤掉可能存在的空值（如果有的话）
    const filteredTags = tags.filter((tag) => tag && tag.trim() !== "");

    res.status(200).json({
      success: true,
      count: filteredTags.length,
      tags: filteredTags,
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tags",
    });
  }
});

app.listen(PORT, HOST, () => {
  const localIPs = getLocalIPs();
  console.log(`  ➜  Local:   http://localhost:${PORT}/`);

  if (localIPs.length > 0) {
    localIPs.forEach((ip) => console.log(`  ➜  Network: http://${ip}:${PORT}`));
  } else {
    console.log("⚠️ 无法获取局域网IP，请检查网络连接");
  }
});
