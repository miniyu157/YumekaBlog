import axios from "axios";
import type { LinkInfo } from "@/utils/types";

export const getLinkInfos = async () => {
  try {
    const response = await axios.get<LinkInfo[]>("http://localhost:3000/api/getlinkinfos");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to fetch links");
    }
    throw new Error("Network error occurred");
  }
};
