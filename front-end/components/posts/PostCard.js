// components/posts/PostCard.js
import React from 'react';
// import Image from 'next/image'; // Recommended for production

const PostCard = ({ title, country, url }) => (
    <div className="flex flex-col gap-4 group cursor-pointer">
        <div className="overflow-hidden rounded-xl">
            {/* For a real Next.js app, replace the style div with the Next.js <Image /> component */}
            <div
                className="bg-center bg-no-repeat aspect-square bg-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                data-alt={title}
                style={{ backgroundImage: `url("${url}")` }}
            ></div>
        </div>
        <div className="flex flex-col">
            <h4 className="font-bold text-text-light dark:text-text-dark">{title}</h4>
            <p className="text-xs text-subtext-light dark:text-subtext-dark">{country}</p>
        </div>
    </div>
);

export default PostCard;