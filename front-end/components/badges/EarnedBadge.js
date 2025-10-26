// components/badges/EarnedBadge.js
import React from 'react';

const EarnedBadge = ({ icon, title, desc }) => (
// Inside components/badges/EarnedBadge.js

// Inside components/badges/EarnedBadge.js

<div className="flex flex-row items-center gap-3 p-3 sm:p-4 bg-background-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark group 
    cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-primary/20"
>
    <div className="size-10 sm:size-12 lg:size-14 flex items-center justify-center rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
        <span className="material-symbols-outlined text-lg sm:text-xl lg:text-2xl">{icon}</span>
    </div>

    <div className="flex flex-col items-start min-w-0">
        <p className="font-bold text-text-light dark:text-text-dark text-sm truncate">{title}</p>
        <p className="text-subtext-light dark:text-subtext-dark text-xs overflow-hidden leading-snug">{desc}</p>
    </div>
</div>
);

export default EarnedBadge;