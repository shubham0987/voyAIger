// components/posts/PostsGrid.js
import React from "react";
import PostCard from "./PostCard";

const PostsGrid = ({ posts }) => (
  <div className="flex flex-col gap-8">
    {posts && posts.length > 0 ? (
      // Renders the grid of posts if the array is NOT empty
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            country={post.country}
            url={post.url}
          />
        ))}
      </div>
    ) : (
      // Renders the placeholder if the array IS empty
      <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-border-light dark:border-border-dark rounded-xl bg-background-light dark:bg-background-dark/50">
        <span className="material-symbols-outlined text-6xl text-subtext-light dark:text-subtext-dark mb-4">
          add_a_photo
        </span>
        <p className="font-bold text-text-light dark:text-text-dark text-lg">
          Time to share your adventures!
        </p>
        <p className="text-subtext-light dark:text-subtext-dark text-sm mt-2 max-w-sm">
          You haven't posted anything yet. Click the "Create Post" button to
          share your first memory.
        </p>
      </div>
    )}
  </div>
);

export default PostsGrid;
