import express from "express";
import fs from "fs";
import path from "path";
import os from "os";
import cors from "cors";
import { connect } from "mongoose";

import PostDataModel from "./models/PostData.js";
import friendLinkModel from "./models/FriendLink.js";

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

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/blog")
      .then(() => console.log("\nConnected to MongoDB..."))
      .catch((err) => console.error("Could not connect to MongoDB:", err));

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

connectDB();

app.use(cors());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public", "backgrounds")));

app.use("/images", express.static(path.join(__dirname, "public", "friends")));

app.use("/images", express.static(path.join(__dirname, "public", "posts")));

app.get("/api/random-image", (req, res) => {
  try {
    const group = req.query.group || "1";
    const imageDir = path.join(__dirname, "public", "backgrounds", group);
    const files = fs.readdirSync(imageDir);

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: `找不到图片`,
      });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];

    res.status(200).json({
      success: true,
      message: `请求成功`,
      imageUrl: `/images/${group}/${randomFile}`,
      filename: randomFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `服务器错误，请稍后重试`,
    });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    // 分页参数校验
    let page = parseInt(req.query.page, 10) || 1;
    page = Math.max(1, page); // 确保不小于1

    let limit = parseInt(req.query.limit, 10) || 10;
    limit = Math.min(Math.max(1, limit), 100); // 限制在1-100之间

    // 排序参数校验
    const sortBy = req.query.sort || "-createdAt";

    // 过滤参数
    const filters = {};

    // 标签过滤逻辑增强
    if (req.query.tags) {
      const tags = req.query.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      if (tags.length === 0) {
        return res.status(400).json({
          success: false,
          message: "标签参数格式错误",
        });
      }

      const filterType = (req.query.tagFilterType || "OR").toUpperCase();
      if (!["AND", "OR"].includes(filterType)) {
        return res.status(400).json({
          success: false,
          message: "tagFilterType 参数必须为 AND 或 OR",
        });
      }

      filters.tags = filterType === "AND" ? { $all: tags } : { $in: tags };
    }

    // 搜索关键词处理
    if (req.query.search) {
      const searchTerm = req.query.search.trim();
      if (searchTerm) {
        filters.title = {
          $regex: searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          $options: "i",
        };
      }
    }

    // 数据库查询
    const [posts, total] = await Promise.all([
      PostDataModel.find(filters)
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortBy)
        .lean(),
      PostDataModel.countDocuments(filters),
    ]);

    res.status(200).json({
      success: true,
      message: "请求成功",
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "服务器错误，请稍后重试",
    });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostDataModel.findById(id).select("-__v");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "404 Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: `请求成功`,
      data: post,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "无效的文章ID",
      });
    }

    res.status(500).json({
      success: false,
      message: `服务器错误，请稍后重试`,
    });
  }
});

app.get("/api/friendlinks", async (req, res) => {
  try {
    const links = await friendLinkModel.find().lean();

    res.status(200).json({
      success: true,
      message: `请求成功`,
      count: links.length,
      data: links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `服务器错误，请稍后重试`,
    });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    const tags = await PostDataModel.distinct("tags");
    const filteredTags = tags.filter((tag) => tag && tag.trim() !== "");

    res.status(200).json({
      success: true,
      message: `请求成功`,
      count: filteredTags.length,
      data: filteredTags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `服务器错误，请稍后重试`,
    });
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "404 Not Found",
  });
});

app.listen(PORT, HOST, () => {
  console.log("Server start\n");

  const localIPs = getLocalIPs();
  console.log(`  ➜  Local:   http://localhost:${PORT}/`);

  if (localIPs.length > 0) {
    localIPs.forEach((ip) => console.log(`  ➜  Network: http://${ip}:${PORT}`));
  } else {
    console.log("⚠️ 无法获取局域网IP，请检查网络连接");
  }
});
