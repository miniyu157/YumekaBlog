import axios, { type AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface Post {
  _id: string; // Assuming MongoDB ObjectId as string
  title: string;
  imageUrl: string;
  content: string;
  heat: number;
  comments: number; // Or an array of comment objects if populated
  likes: number;
  tags: string[];
  createdAt: string; // Assuming ISO date string
  updatedAt: string; // Assuming ISO date string
  // Add any other fields from your PostModel
}

/**
 * Represents the structure of API error responses.
 */
interface ApiError {
  message?: string; // Error message from the backend (e.g., "Post not found")
  error?: string; // Alternative error field
  // Add other potential error fields if your backend sends them
}

const getPostModel = () => {
  /**
   * Fetches a single post by its ID from the backend.
   * @param {string} postId - The ID of the post to fetch.
   * @returns {Promise<Post | null>} A promise that resolves to the Post object or null if not found.
   * @throws {Error} Throws an error if the API request fails for reasons other than not found.
   */
  const getPostById = async (postId: string): Promise<Post | null> => {
    // Basic validation for postId
    if (!postId || typeof postId !== "string" || postId.trim() === "") {
      console.error("Invalid postId provided:", postId);
      throw new Error("Invalid post ID provided.");
    }

    try {
      const response = await axios.get<Post>(`${API_BASE_URL}/posts/${postId}`);
      // Check if response.data exists and has an _id (basic check for valid post)
      if (response.data && response.data._id) {
        return response.data;
      } else {
        // Should ideally not happen if backend returns 404 correctly, but good practice
        console.warn(`Post data received for ID ${postId} seems invalid:`, response.data);
        return null; // Or throw an error depending on desired handling
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        // Handle specific status codes
        if (axiosError.response.status === 404) {
          console.log(`Post with ID ${postId} not found.`);
          return null; // Return null if the post is not found (404)
        }
        if (axiosError.response.status === 400) {
          console.error(
            `Bad request fetching post ${postId}:`,
            axiosError.response.data?.message || axiosError.response.data?.error
          );
          throw new Error(
            axiosError.response.data?.message ||
              axiosError.response.data?.error ||
              "Invalid request (e.g., bad ID format)"
          );
        }
        // Log other server-side errors
        console.error(
          `Error fetching post ${postId} (Status ${axiosError.response.status}):`,
          axiosError.response.data
        );
        throw new Error(
          axiosError.response.data?.error ||
            axiosError.response.data?.message ||
            `Failed to fetch post (Status ${axiosError.response.status})`
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error(`No response received for post ${postId}:`, axiosError.request);
        throw new Error("Network error or server did not respond.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", axiosError.message);
        throw new Error(`Request setup failed: ${axiosError.message}`);
      }
    }
  };

  // Return all the API functions
  return { getPostById };
};

// Export the API client instance
export const postApi = getPostModel();
