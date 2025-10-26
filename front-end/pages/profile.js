// pages/profile.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import BadgeSection from '../components/badges/BadgeSection';
import PostsGrid from '../components/posts/PostsGrid';
import { profileData } from '../data/profileData'; // Import mock data

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('badges');
    const [showAchievement, setShowAchievement] = useState(false);

    // Placeholder for Map View content
    const MapContent = () => (
        <div className="flex justify-center items-center h-96 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
            <p className="text-subtext-light dark:text-subtext-dark text-lg font-medium">Interactive Map View Placeholder</p>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'badges':
                return <BadgeSection badges={profileData.badges} />;
            case 'posts':
                return <PostsGrid posts={profileData.imageUrls.posts} />;
            case 'map':
                return <MapContent />;
            default:
                return <BadgeSection badges={profileData.badges} />;
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <Head>
                <title>{profileData.name}'s Profile - voyAIger</title>
            </Head>

            <Header profileImageUrl={profileData.imageUrls.header} />
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main grid container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* ➡️ LEFT COLUMN (ProfileCard - Sticky on Large Screens) */}
                    <div className="lg:col-span-4 xl:col-span-3"> 
                        <div className="lg:sticky **lg:top-0**"> 
                            <ProfileCard profile={profileData} />
                        </div>
                    </div>

                    {/* ⬅️ RIGHT COLUMN (Dynamic Content - Scrolls with the Page) */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <div className="flex flex-col gap-8">
                            
                            {/* Tab Navigation */}
                            <div className="border-b border-border-light dark:border-border-dark flex items-center gap-4 px-2">
                                {/* Badges Tab */}
                                <button onClick={() => setActiveTab('badges')} className={`flex items-center gap-2 py-3 px-2 border-b-2 ${activeTab === 'badges' ? 'border-primary text-primary font-bold' : 'border-transparent text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark font-medium'} text-xs transition-colors`}>
                                    <span className="material-symbols-outlined text-base sm:text-lg">workspace_premium</span>
                                    <span>Badges</span>
                                </button>
                                {/* Posts Tab */}
                                <button onClick={() => setActiveTab('posts')} className={`flex items-center gap-2 py-3 px-2 border-b-2 ${activeTab === 'posts' ? 'border-primary text-primary font-bold' : 'border-transparent text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark font-medium'} text-xs transition-colors`}>
                                    <span className="material-symbols-outlined text-base sm:text-lg">grid_view</span>
                                    <span>Posts</span>
                                </button>
                                {/* Map View Tab */}
                                <button onClick={() => setActiveTab('map')} className={`flex items-center gap-2 py-3 px-2 border-b-2 ${activeTab === 'map' ? 'border-primary text-primary font-bold' : 'border-transparent text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark font-medium'} text-xs transition-colors`}>
                                    <span className="material-symbols-outlined text-base sm:text-lg">map</span>
                                    <span>Map View</span>
                                </button>
                            </div>
                            
                            {/* Achievement Toast (State-controlled visibility) */}
                            <div className={`fixed bottom-8 right-8 bg-primary text-white py-3 px-6 rounded-lg shadow-xl flex items-center gap-3 z-50 transform transition-all duration-500 ease-out ${showAchievement ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <span className="material-symbols-outlined text-3xl">trophy</span>
                                <div>
                                    <p className="font-bold text-lg">Achievement Unlocked!</p>
                                    <p className="text-xs">Visited 50 Countries!</p>
                                </div>
                            </div>
                            
                            {/* Dynamic Content */}
                            {renderContent()}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;