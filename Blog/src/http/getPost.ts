// getPost.vue
import axios, { type AxiosError } from "axios";
import type { Post } from "./getPosts";

const getPostModel = () => {
  const getPost = async (id: string): Promise<Post> => {
    try {
      const response = await axios.get<{ data: Post }>("http://localhost:3000/api/post", {
        params: { id } // 改为查询参数方式
      });

      if (!response.data.data) {
        throw new Error("Post data format error");
      }

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;

      // 根据后端响应细化错误提示
      const errorMessage = axiosError.response?.status === 400
        ? (axiosError.response.data.error || "Invalid request")
        : axiosError.response?.status === 404
        ? "Post not found"
        : "Failed to fetch post";

      throw new Error(errorMessage);
    }
  };

  return { getPost };
};

export const postApi = getPostModel();
