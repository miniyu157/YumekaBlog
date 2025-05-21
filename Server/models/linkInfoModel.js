import { Schema, model } from "mongoose";

const linkInfoSchema = new Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default model("LinkInfo", linkInfoSchema);
