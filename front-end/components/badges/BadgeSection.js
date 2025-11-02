import React from "react";
import EarnedBadge from "./EarnedBadge";

const BadgeSection = ({ badges }) => {
  const progress = badges.progress;

  return (
    <div className="flex flex-col gap-8">
      {/* Progress to Next Badge */}
      <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
        <h3 className="text-text-light dark:text-text-dark text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-accent">
            military_tech
          </span>
          Progress to Next Badge
        </h3>
        <p className="text-subtext-light dark:text-subtext-dark text-xs sm:text-xs mb-4">
          You're close to earning the **"{progress.title}"** badge!
        </p>
        <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-3 mb-2">
          <div
            className="bg-primary h-3 rounded-full"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-subtext-light dark:text-subtext-dark">
          <span>
            {progress.current}/{progress.target} Countries visited
          </span>
          <span>Next Badge: {progress.target} Countries</span>
        </div>
      </div>

      {/* My Trophy Case (Earned Badges) */}
      <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
        <h3 className="text-text-light dark:text-text-dark text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            collections_bookmark
          </span>
          My Trophy Case
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {badges.earned.map((badge, index) => (
            <EarnedBadge key={index} {...badge} />
          ))}
        </div>
      </div>

      {/* Future Achievements */}
      <div className="p-4 sm:p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
        <h3 className="text-text-light dark:text-text-dark text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] mb-4 sm:mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-subtext-light">
            military_tech
          </span>
          Future Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {badges.future.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark opacity-60"
            >
              <div className="size-10 sm:size-12 lg:size-14 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 flex-shrink-0">
                <span className="material-symbols-outlined text-lg sm:text-xl lg:text-2xl">
                  {badge.icon}
                </span>
              </div>

              <div className="flex flex-col min-w-0">
                <p className="font-bold text-text-light dark:text-text-dark text-sm whitespace-nowrap overflow-hidden truncate">
                  {badge.title}
                </p>
                <p className="text-subtext-light dark:text-subtext-dark text-xs whitespace-nowrap overflow-hidden truncate">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeSection;
