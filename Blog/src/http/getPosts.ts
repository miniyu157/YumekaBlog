import axios, { type AxiosError } from "axios";

// 定义文章类型接口（根据后端数据结构调整）
export interface Post {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
  heat: number;
  comments: number;
  likes: number;
  tags: string[];
  createdAt: string; // 根据需求可选保留
  updatedAt: string; // 根据需求可选保留
}

// 分页响应结构
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 完整 API 响应结构
interface ApiResponse {
  data: Post[];
  pagination: Pagination;
}

// 请求参数类型
interface GetPostsParams {
  page?: number;
  limit?: number;
  sort?: string;
  tags?: string[];
  search?: string;
}

const getPostsModel = () => {
  /**
   * 获取文章列表
   * @param params 请求参数：分页、排序、过滤
   */
  const getPosts = async (params: GetPostsParams = {}): Promise<ApiResponse> => {
    try {
      // 处理请求参数（过滤未定义值）
      const processedParams: Record<string, any> = {
        page: params.page || 1,
        limit: Math.min(params.limit || 10, 100),
      };

      if (params.sort) processedParams.sort = params.sort;
      if (params.tags?.length) processedParams.tags = params.tags.join(",");
      if (params.search) processedParams.search = params.search;

      const response = await axios.get<ApiResponse>("http://0.0.0.0:3000/api/posts", {
        params: processedParams,
        paramsSerializer: { indexes: null }, // 处理数组参数为 tags=a,b,c
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;
      throw new Error(
        axiosError.response?.data?.error || "Failed to fetch posts due to network error"
      );
    }
  };

  return { getPosts };
};

// 导出 API 实例
export const postApi = getPostsModel();
