"use client";

import SkeletonTable from "./SkeletonTable";
import TableHeader from "./Header";
import ResultsTableRow from "./ResultsTableRow";
import ErrorDisplay from "./ErrorDisplay";
import useCompetitionData from "@/hooks/useCompetitionData";
import { AllRounderYearData } from "@/utils/competitionIds";
import { useTranslations } from "next-intl";

const ResultsTable = ({
  competitionData,
}: {
  competitionData: AllRounderYearData;
}) => {
  const { peopleArray, loading, error, currentYearKey, getYearKeyForProps } =
    useCompetitionData(competitionData);
  const t = useTranslations("ResultsTable");

  // Skeleton loader
  if (loading || getYearKeyForProps() !== currentYearKey) {
    return (
      <SkeletonTable
        className="w-full"
        competitionCount={Object.keys(competitionData.ids).length}
      />
    );
  }

  if (error) {
    return <ErrorDisplay error={error} className="w-full" />;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600 mb-20 overflow-y-auto">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <TableHeader competitionData={competitionData} />
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-600">
            {peopleArray.length === 0 ? (
              <tr>
                <td
                  colSpan={100}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  {t("NoData")}
                </td>
              </tr>
            ) : (
              peopleArray.map((row, i) => (
                <ResultsTableRow
                  key={row.person.wcaId}
                  row={row}
                  index={i}
                  competitionData={competitionData}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
