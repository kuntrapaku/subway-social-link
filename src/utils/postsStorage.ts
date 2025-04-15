import { Post } from "@/components/NewPost";

// The key to use in localStorage
const POSTS_STORAGE_KEY = "subway_app_posts";
const FRAMES_STORAGE_KEY = "subway_app_frames";

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

// Get all frames from localStorage
export const getFrames = (): Post[] => {
  try {
    const storedFrames = localStorage.getItem(FRAMES_STORAGE_KEY);
    return storedFrames ? JSON.parse(storedFrames) : [];
  } catch (error) {
    console.error("Error retrieving frames from localStorage:", error);
    return [];
  }
};

// Save all frames to localStorage
export const saveFrames = (frames: Post[]): void => {
  try {
    localStorage.setItem(FRAMES_STORAGE_KEY, JSON.stringify(frames));
    // Dispatch a custom event to notify other components about the frames update
    window.dispatchEvent(new Event("frames-updated"));
  } catch (error) {
    console.error("Error saving frames to localStorage:", error);
  }
};

// Add a new frame and save to localStorage
export const addFrame = (frame: Post): Post[] => {
  try {
    const currentFrames = getFrames();
    const updatedFrames = [frame, ...currentFrames];
    saveFrames(updatedFrames);
    return updatedFrames;
  } catch (error) {
    console.error("Error adding frame to localStorage:", error);
    return [frame];
  }
};

// Toggle like status for a post
export const togglePostLike = (postId: string): Post[] => {
  try {
    const currentPosts = getPosts();
    const updatedPosts = currentPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    savePosts(updatedPosts);
    return updatedPosts;
  } catch (error) {
    console.error("Error toggling post like in localStorage:", error);
    return getPosts();
  }
};

// Add a comment to a post
export const addCommentToPost = (postId: string): Post[] => {
  try {
    const currentPosts = getPosts();
    const updatedPosts = currentPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    });
    savePosts(updatedPosts);
    return updatedPosts;
  } catch (error) {
    console.error("Error adding comment to post in localStorage:", error);
    return getPosts();
  }
};

// Toggle like status for a frame
export const toggleFrameLike = (frameId: string): Post[] => {
  try {
    const currentFrames = getFrames();
    const updatedFrames = currentFrames.map(frame => {
      if (frame.id === frameId) {
        return {
          ...frame,
          isLiked: !frame.isLiked,
          likes: frame.isLiked ? frame.likes - 1 : frame.likes + 1
        };
      }
      return frame;
    });
    saveFrames(updatedFrames);
    return updatedFrames;
  } catch (error) {
    console.error("Error toggling frame like in localStorage:", error);
    return getFrames();
  }
};

// Add a comment to a frame
export const addCommentToFrame = (frameId: string): Post[] => {
  try {
    const currentFrames = getFrames();
    const updatedFrames = currentFrames.map(frame => {
      if (frame.id === frameId) {
        return {
          ...frame,
          comments: frame.comments + 1
        };
      }
      return frame;
    });
    saveFrames(updatedFrames);
    return updatedFrames;
  } catch (error) {
    console.error("Error adding comment to frame in localStorage:", error);
    return getFrames();
  }
};
