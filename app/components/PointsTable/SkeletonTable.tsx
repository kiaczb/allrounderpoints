"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonTableProps {
  className?: string;
  competitionCount: number;
}

export default function SkeletonTable({
  className = "",
  competitionCount,
}: SkeletonTableProps) {
  return (
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
                          className="rounded"
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
  );
}
