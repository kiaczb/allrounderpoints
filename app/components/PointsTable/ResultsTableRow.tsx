import { IEventResult } from "@/utils/pointCalculator";
import EventCell from "./EventCell";

interface ResultsTableRowProps {
  row: any;
  index: number;
  competitionData: {
    ids: Record<string, string>;
  };
}

export default function ResultsTableRow({
  row,
  index,
  competitionData,
}: ResultsTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td
        className={`px-3 py-3 font-semibold text-center whitespace-nowrap ${
          index + 1 <= 10 ? "bg-green-500" : ""
        }`}
      >
        {index + 1}
      </td>
      <td className="px-3 py-2 text-center min-w-[120px] max-w-[180px] sm:max-w-[220px]">
        <div className="hyphens-auto">
          <span className="font-medium text-gray-900 dark:text-white ">
            {row.name}
          </span>
        </div>
      </td>
      <td className="px-3 py-3 font-bold text-blue-600 dark:text-blue-400 text-center whitespace-nowrap">
        {row.totalPoints}
      </td>
      {Object.entries(competitionData.ids).map(([competitionId]) => {
        const resultsForCompetition = row.bestResults
          .toArray()
          .filter((r: IEventResult) => r.competitionId === competitionId);

        return (
          <td key={competitionId} className="px-2 py-2">
            <div className="grid grid-cols-2 gap-1.5 min-w-[85px] max-w-[100px] mx-auto">
              <EventCell results={resultsForCompetition} />
            </div>
          </td>
        );
      })}
    </tr>
  );
}
