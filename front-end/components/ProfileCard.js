// components/ProfileCard.js
import React from 'react';

const StatItem = ({ count, label }) => (
    <div className="flex flex-col gap-1 rounded-lg border border-border-light dark:border-border-dark p-3 bg-background-light dark:bg-background-dark">
        <p className="text-text-light dark:text-text-dark tracking-light text-base sm:text-lg font-bold leading-tight">{count}</p>
        <p className="text-subtext-light dark:text-subtext-dark text-xs font-normal leading-normal">{label}</p>
    </div>
);

const ProfileCard = ({ profile }) => {
    const firstInitial = profile.name ? profile.name.charAt(0).toUpperCase() : '';

    return (
        <aside className="lg:col-span-4 xl:col-span-3 lg:sticky top-28 h-fit">
            <div className="flex flex-col gap-6 p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                
                <div className="flex flex-col items-center gap-4 text-center">
                    
                    {profile.imageUrls.profile ? (
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-fluid-profile" 
                            data-alt={`Profile picture of ${profile.name}`}
                            style={{ backgroundImage: `url("${profile.imageUrls.profile}")` }}
                        ></div>
                    ) : (
                        <div
                            className="flex items-center justify-center rounded-full size-fluid-profile 
                                       bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-light 
                                       font-bold text-4xl sm:text-5xl"
                            data-alt={`Avatar for ${profile.name}`}
                        >
                            {firstInitial}
                        </div>
                    )}

                    <div className="flex flex-col justify-center">
                        <p className="text-text-light dark:text-text-dark text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em]">{profile.name}</p>
                        <p className="text-subtext-light dark:text-subtext-dark text-xs font-normal leading-normal">@{profile.handle}</p>
                    </div>
                    <p className="text-subtext-light dark:text-subtext-dark text-xs font-normal leading-normal">{profile.bio}</p>
                    
                    <div className="flex w-full gap-3 justify-center">
                        <button 
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center 
                                    overflow-hidden rounded-lg h-10 px-4 bg-accent text-white 
                                    text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] flex-1
                                    
                                    transition-all duration-200 
                                    hover:shadow-md hover:shadow-accent/50 hover:-translate-y-0.5" // HOVER EFFECT ADDED
                        >
                            <span className="truncate">Edit Profile</span>
                        </button>
                        
                        {/* If you add the Message button back, apply the same hover effects: */}
                        {/* <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] flex-1 transition-all duration-200 hover:shadow-md hover:shadow-primary/50 hover:-translate-y-0.5">
                            <span className="truncate">Message</span>
                        </button> */}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <StatItem count={profile.stats.countries} label="Countries" />
                    <StatItem count={profile.stats.posts} label="Posts" />
                    <StatItem count={profile.stats.followers} label="Followers" />
                    <StatItem count={profile.stats.following} label="Following" />
                </div>
                
                <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pt-2">Interests</h3>
                
                <div className="flex gap-2 flex-wrap">
                    {profile.interests.map((interest, index) => (
                        <div 
                            key={index} 
                            className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg 
                                       bg-background-light dark:bg-background-dark px-3 cursor-pointer 
                                       transition-all duration-200 
                                       hover:ring-2 hover:ring-primary"
                        >
                            <p className="text-subtext-light dark:text-subtext-dark text-xs font-medium leading-normal 
                                          transition-colors">
                                {interest}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ProfileCard;