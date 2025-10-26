// components/posts/PostsGrid.js
import React from 'react';
import PostCard from './PostCard';

const PostsGrid = ({ posts }) => (
    <div className="flex flex-col gap-8">
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
    </div>
);

export default PostsGrid;