"use client";

import SkeletonTable from "./SkeletonTable";
import TableHeader from "./Header";
import ResultsTableRow from "./ResultsTableRow";
import ErrorDisplay from "./ErrorDisplay";
import useCompetitionData from "@/hooks/useCompetitionData";
import { AllRounderYearData } from "@/utils/competitionIds";

const ResultsTable = ({
  competitionData,
  className = "",
}: {
  competitionData: AllRounderYearData;
  className?: string;
}) => {
  const { peopleArray, loading, error, currentYearKey, getYearKeyForProps } =
    useCompetitionData(competitionData);

  // Skeleton loader
  if (loading || getYearKeyForProps() !== currentYearKey) {
    return (
      <SkeletonTable
        className={className}
        competitionCount={Object.keys(competitionData.ids).length}
      />
    );
  }

  if (error) {
    return <ErrorDisplay error={error} className={className} />;
  }

  if (peopleArray.length === 0) {
    return (
      <div className={`${className} p-8 text-center`}>
        <div className="text-gray-500 dark:text-gray-400">
          Nincs megjeleníthető adat.
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600 mb-20 overflow-y-auto">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <TableHeader competitionData={competitionData} />
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-600">
            {peopleArray.map((row, i) => (
              <ResultsTableRow
                key={row.person.wcaId}
                row={row}
                index={i}
                competitionData={competitionData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
