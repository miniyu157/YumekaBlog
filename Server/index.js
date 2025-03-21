import express from "express";
import fs from "fs";
import path from "path";
import os from "os";
import cors from "cors";
import connectDB from "./db.js";
import PostModel from "./models/postModel.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

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

app.use(
  "/images",
  express.static(path.join(__dirname, "public", "backgrounds"))
);

app.use(
  "/images",
  express.static(path.join(__dirname, "public", "postimages"))
);

// 随机图片接口
app.get("/api/random-image", (req, res) => {
  try {
    const imageDir = path.join(__dirname, "public", "backgrounds");
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

// 新增文章创建接口
app.post("/api/posts", async (req, res) => {
  try {
    const { title, imageUrl, content, heat, comments, likes, tags } = req.body;

    // 创建新文章
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

// # 获取第一页，每页20条，按热度排序
// GET /api/posts?page=1&limit=20&sort=-heat

// # 过滤包含"tech"或"guide"标签的文章
// GET /api/posts?tags=tech,guide

app.get("/api/posts", async (req, res) => {
  try {
    // 分页参数
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = Math.min(limit, 100); // 防止过大请求
    
    // 排序参数（-表示倒序）
    const sortBy = req.query.sort || '-createdAt';
    
    // 过滤参数（示例：按标签过滤）
    const filters = {};
    if (req.query.tags) {
      filters.tags = { $in: req.query.tags.split(',') };
    }

    // 数据库查询
    const [posts, total] = await Promise.all([
      PostModel.find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortBy),
      PostModel.countDocuments(filters)
    ]);

    res.status(200).json({
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message || "Failed to fetch posts" 
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
