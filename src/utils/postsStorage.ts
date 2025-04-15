
import { Post } from "@/components/NewPost";

// The key to use in localStorage
const POSTS_STORAGE_KEY = "subway_app_posts";

// Get all posts from localStorage
export const getPosts = (): Post[] => {
  try {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error("Error retrieving posts from localStorage:", error);
    return [];
  }
};

// Save all posts to localStorage
export const savePosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving posts to localStorage:", error);
  }
};

// Add a new post and save to localStorage
export const addPost = (post: Post): Post[] => {
  try {
    const currentPosts = getPosts();
    const updatedPosts = [post, ...currentPosts];
    savePosts(updatedPosts);
    return updatedPosts;
  } catch (error) {
    console.error("Error adding post to localStorage:", error);
    return [post];
  }
};
