import axios, { type AxiosError } from "axios";

export interface TagsResponse {
  success: boolean;
  count: number;
  tags: string[];
}

const getTagsModel = () => {

  const getTags = async (): Promise<TagsResponse> => {
    try {
      const response = await axios.get<TagsResponse>('http://localhost:3000/api/tags');

      // 验证响应结构
      if (!response.data?.success || !Array.isArray(response.data.tags)) {
        throw new Error("Invalid tags response structure");
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;

      // 优先使用服务器返回的错误信息
      const serverMessage = axiosError.response?.data?.error;

      // 处理常见错误状态
      const errorMessages: Record<number, string> = {
        404: "Tags API endpoint not found",
        500: "Server failed to process tags request"
      };

      throw new Error(
        serverMessage ||
        errorMessages[axiosError.response?.status || 0] ||
        "Failed to fetch tags due to network error"
      );
    }
  }

  return { getTags }
}

export const tagsApi = getTagsModel();
