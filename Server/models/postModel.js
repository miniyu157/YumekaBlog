import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      default: "untitle",
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "https://placehold.co/600x400/eee/ccc?text=No+Image",
    },
    content: {
      type: String,
      default: "no content",
    },
    heat: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
