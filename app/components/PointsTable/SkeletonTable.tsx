"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonTableProps {
  className?: string;
  competitionCount: number;
}

const SKELETON_COLOR_LIGHT = "#e5e7eb";
const SKELETON_HIGHLIGHTCOLOR_LIGHT = "#f3f4f6";
const SKELETON_COLOR_DARK = "#374151";
const SKELETON_HIGHLIGHTCOLOR_DARK = "#4b5563";

export default function SkeletonTable({
  className = "",
  competitionCount,
}: SkeletonTableProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  if (!mounted) {
    return (
      <div className={className}>
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600 max-h-[655px] overflow-y-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            {/* Üres táblázat a layout fenntartásához */}
            <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3">
                  <div className="h-6 w-16"></div>
                </th>
                <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3">
                  <div className="h-6 w-20 mx-auto"></div>
                </th>
                <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3">
                  <div className="h-6 w-12"></div>
                </th>
                {[...Array(competitionCount)].map((_, i) => (
                  <th key={i} className="px-2 py-2 m-4">
                    <div className="h-6 w-24 mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }

  return (
    <SkeletonTheme
      baseColor={isDarkMode ? SKELETON_COLOR_DARK : SKELETON_COLOR_LIGHT}
      highlightColor={
        isDarkMode
          ? SKELETON_HIGHLIGHTCOLOR_DARK
          : SKELETON_HIGHLIGHTCOLOR_LIGHT
      }
    >
      <div className={className}>
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600 max-h-[655px] overflow-y-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-left whitespace-nowrap">
                  <Skeleton width={60} />
                </th>
                <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-center">
                  <Skeleton width={80} className="mx-auto" />
                </th>
                <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-left whitespace-nowrap">
                  <Skeleton width={50} />
                </th>
                {[...Array(competitionCount)].map((_, i) => (
                  <th key={i} className="px-2 py-2 m-4">
                    <Skeleton width={100} className="mx-auto" height={24} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-3 py-3">
                    <Skeleton width={30} className="mx-auto" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Skeleton width={120} className="mx-auto" />
                  </td>
                  <td className="px-3 py-3">
                    <Skeleton width={40} className="mx-auto" />
                  </td>
                  {[...Array(competitionCount)].map((_, colIndex) => (
                    <td key={colIndex} className="px-2 py-2">
                      <div className="grid grid-cols-2 gap-1.5 min-w-[85px] max-w-[100px] mx-auto">
                        {[...Array(4)].map((_, eventIndex) => (
                          <Skeleton
                            key={eventIndex}
                            height={32}
                            className="rounded "
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SkeletonTheme>
  );
}
