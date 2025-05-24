import axios from "axios";

import { createAlova } from "alova";
import adapterFetch from "alova/fetch";

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  responded: (response) => response.json(),
});

export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface FriendData {
  title?: string;
  subtitle?: string;
  link?: string;
  image?: string;
}

export interface FriendLinksResponse extends BaseResponse {
  count: number;
  data: FriendData[];
}

export interface TagsResponse extends BaseResponse {
  count: number;
  data: string[];
}

export interface PostData {
  _id: string;
  title?: string;
  imageUrl?: string;
  content?: string;
  heat?: number;
  comments?: number;
  likes?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PostResponse extends BaseResponse {
  data: PostData;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  sort?: string;
  tags?: string[];
  tagFilterType?: "AND" | "OR";
  search?: string;
}

export interface PostsResponse extends BaseResponse {
  data: PostData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

export interface ImageResponse extends BaseResponse {
  imageUrl: string;
  filename: string;
}

export const ServerIP = "http://localhost:3000";

const GET_RANDOM_IMAGE_URL = `${ServerIP}/api/random-image`;
const GET_POST_URL = `${ServerIP}/api/posts`;
const GET_FRIEND_LINKS = `${ServerIP}/api/friendlinks`;
const GET_TAGS = `${ServerIP}/api/tags`;

export const httpget = {
  getRandomImage: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await alovaInstance.Get<ImageResponse>(GET_RANDOM_IMAGE_URL);
      if (!response.success) throw new Error(response.message);

      return `${ServerIP}${response.imageUrl}`;
    } catch (error: any) {
      throw new Error(error.message || "获取文章列表失败，请检查网络连接");
    }
  },

  getPosts: async (params: GetPostsParams) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // 构建查询参数
      const queryParams = new URLSearchParams({
        page: params.page?.toString() || "1",
        limit: params.limit?.toString() || "10",
        sort: params.sort || "-createdAt",
        ...(params.search && { search: params.search }),
        ...(params.tags && { tags: params.tags.join(",") }),
        ...(params.tagFilterType && { tagFilterType: params.tagFilterType }),
      });

      const response = await alovaInstance.Get<PostsResponse>(`${GET_POST_URL}?${queryParams}`);

      if (!response.success) throw new Error(response.message);

      // 处理图片路径
      const processedData = response.data.map((post) => ({
        ...post,
        imageUrl: post.imageUrl?.startsWith("/") ? `${ServerIP}${post.imageUrl}` : post.imageUrl,
      }));

      return {
        ...response,
        data: processedData,
      };
    } catch (error: any) {
      throw new Error(error.message || "获取文章列表失败，请检查网络连接");
    }
  },

  getPostById: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const fulllink = `${GET_POST_URL}/${id}`;
      const response = await alovaInstance.Get<PostResponse>(fulllink);
      if (!response.success) throw new Error(response.message);

      if (response.data.imageUrl?.startsWith("/")) {
        response.data.imageUrl = `${ServerIP}${response.data.imageUrl}`;
      }

      return response;
    } catch (error: any) {
      throw new Error(error.message || "获取文章失败，请检查网络连接");
    }
  },

  getFriendlinks: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await alovaInstance.Get<FriendLinksResponse>(GET_FRIEND_LINKS);
      if (!response.success) throw new Error(response.message);
      return response;
    } catch (error: any) {
      throw new Error(error.message || "获取朋友列表失败，请检查网络连接");
    }
  },

  getTags: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await alovaInstance.Get<TagsResponse>(GET_TAGS);
      if (!response.success) throw new Error(response.message);
      return response;
    } catch (error: any) {
      throw new Error(error.message || "获取标签列表失败，请检查网络连接");
    }
  },
};
