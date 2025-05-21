import { Schema, model } from "mongoose";

const friendLinkSchema = new Schema({
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

export default model("FriendLink", friendLinkSchema);
