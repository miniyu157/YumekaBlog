import axios from "axios";

const randomImageModel = () => {
  type RandomImageApi = {
    name: string;
    api: string;
    key: string;
  };

  const randomImageApis: RandomImageApi[] = [
    {
      name: "localhost",
      api: "http://localhost:3000/api/random-image?source=pixiv",
      key: "imageUrl",
    },
    {
      name: "localhost",
      api: "http://localhost:3000/api/random-image?source=bigknight53",
      key: "imageUrl",
    },
  ];

  async function getRandomImageUrl(apiIndex: number): Promise<string> {
    const api = randomImageApis[apiIndex];
    const API_ENDPOINT = api.api;
    const RESPONSE_KEY = api.key;

    try {
      const response = await axios.get(API_ENDPOINT);
      const url = String(response.data[RESPONSE_KEY] || "").trim();

      if (/^https?:\/\//i.test(url)) {
        return url;
      }

      try {
        const baseUrl = new URL(API_ENDPOINT);
        const fullUrl = new URL(url, baseUrl.origin);

        return fullUrl.protocol.startsWith("http") ? fullUrl.href : "";
      } catch (e) {
        return "";
      }
    } catch (error) {
      console.error("Image URL fetch failed:", error);
      return "";
    }
  }

  return {
    getRandomImageUrl,
  };
};

export const imageAPI = randomImageModel();
