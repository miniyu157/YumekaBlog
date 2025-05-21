import { Schema, model } from "mongoose";

const webmetaSchema = new Schema(
  {
    metatitle: {
      type: String,
      default: "untitle",
    },
    webtitle: {
      type: String,
      default: "untitle",
    },
    announcement: {
      type: String,
      default: "no announcement.",
    },
  },
);

export default model("Webmeta", webmetaSchema);
