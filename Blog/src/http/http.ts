import axios from "axios";

export interface LinkInfoResponse {
  title?: string;
  subtitle?: string;
  link?: string;
  image?: string;
}

export interface ImageResponse {
  imageUrl: string;
  filename: string;
}

export interface TagsResponse {
  success: boolean;
  count: number;
  tags: string[];
}

export interface PostResponse {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
  heat: number;
  comments: number;
  likes: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WebmetaResponse {
  metatitle: string;
  webtitle: string;
  announcement: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostsApiResponse {
  data: PostResponse[];
  pagination: Pagination;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  sort?: string;
  tags?: string[];
  search?: string;
}

export const ServerIP = "http://localhost:3000";
const GET_LINK_INFOS_URL = `${ServerIP}/api/getlinkinfos`;
const GET_RANDOM_IMAGE_URL = `${ServerIP}/api/random-image?source=pixiv`; // bigknight53 / pixiv
const GET_ALL_TAG_URL = `${ServerIP}/api/tags`;
const GET_POST_URL = `${ServerIP}/api/posts`;
const GET_WEBMETA_URL = `${ServerIP}/api/getwebmeta`;

export const httpget = {
  getLinkInfos: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await axios.get<LinkInfoResponse[]>(GET_LINK_INFOS_URL);
      return response.data;
    } catch (error) {
      throw new Error(`${GET_LINK_INFOS_URL} failed. (${error})`);
    }
  },
  getRandomImage: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await axios.get<ImageResponse>(GET_RANDOM_IMAGE_URL);
      return `${ServerIP}${response.data.imageUrl}`;
    } catch (error) {
      throw new Error(`${GET_RANDOM_IMAGE_URL} failed. (${error})`);
    }
  },

  getAllTags: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await axios.get<TagsResponse>(GET_ALL_TAG_URL);
      return response.data;
    } catch (error) {
      throw new Error(`${GET_ALL_TAG_URL} failed. (${error})`);
    }
  },

  getPostById: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fulllink = `${GET_POST_URL}/${id}`;

    try {
      const response = await axios.get<PostResponse>(fulllink);
      return response.data;
    } catch (error) {
      throw new Error(`${fulllink} failed. (${error})`);
    }
  },

  getPosts: async (params: GetPostsParams) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await axios.get<PostsApiResponse>(GET_POST_URL, {
        params: params,
        paramsSerializer: { indexes: null },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`获取文章失败: ${error.response?.data?.error || error.message}`);
      }
      throw new Error(`获取文章失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  getWebmeta: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await axios.get<WebmetaResponse>(GET_WEBMETA_URL);
      return response.data;
    } catch (error) {
      throw new Error(`${GET_WEBMETA_URL} failed. (${error})`);
    }
  },
};
