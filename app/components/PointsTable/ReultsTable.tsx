import "@cubing/icons";
import { getPointsForARSeries } from "../../../utils/pointCalculator";
import { AllRounderYearData } from "@/utils/competitionIds";

const ResultsTable = async ({
  competitionData,
  className = "",
}: {
  competitionData: AllRounderYearData;
  className?: string;
}) => {
  // Object.keys(competitionData) helyett: Object.keys(competitionData.ids)
  const results = await Promise.all(
    Object.keys(competitionData.ids).map(async (competitionId) => {
      const res = await fetch(
        `https://www.worldcubeassociation.org/api/v0/competitions/${competitionId}/wcif/public`,
        { next: { revalidate: 300 } }
      );
      const data = await res.json();
      return data;
    })
  );

  var personPositions = getPointsForARSeries(
    results,
    competitionData.POINTS_TABLE,
    competitionData.COUNTING_RESULTS
  );
  const peopleArray = Array.from(personPositions.values()).filter(
    (p) => p.totalPoints > 0
  );
  peopleArray.sort((a, b) => b.totalPoints - a.totalPoints);

  const getEventColor = (eventId: string) => {
    switch (eventId) {
      case "555":
        return "text-orange-600 dark:text-orange-400";
      case "666":
        return "text-blue-600 dark:text-blue-400";
      case "777":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className={className}>
      {/* Konténer, amin belül görgethető lesz a táblázat */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600 max-h-[655px] overflow-y-auto">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-left whitespace-nowrap">
                Helyezés
              </th>
              <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-center">
                Név
              </th>
              <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-left whitespace-nowrap">
                Összes
              </th>

              {Object.entries(competitionData.ids).map(
                ([competitionId, competitionName]) => (
                  <th key={competitionId} className="">
                    <div className="flex items-center gap-1 justify-center">
                      <span>{competitionName}</span>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-600">
            {peopleArray.map((row, i) => (
              <tr
                key={row.person.wcaId}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td
                  className={`px-3 py-3 font-semibold text-center whitespace-nowrap ${
                    i + 1 <= 10 ? "bg-green-500" : ""
                  }`}
                >
                  {i + 1}
                </td>
                <td className="px-3 py-2 text-center min-w-[120px] max-w-[180px] sm:max-w-[220px]">
                  <div className="hyphens-auto">
                    <span className="font-medium text-gray-900 dark:text-white ">
                      {row.person.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 font-bold text-blue-600 dark:text-blue-400 text-center whitespace-nowrap">
                  {row.totalPoints}
                </td>
                {Object.entries(competitionData.ids).map((_, compIndex) => {
                  const competition = row.competitions.get(compIndex);
                  const bestResults = competition
                    ? row.best50Map.get(competition.competitionId)
                    : undefined;

                  return (
                    <td key={compIndex} className="px-2 py-2">
                      <div className="grid grid-cols-2 gap-1.5 min-w-[85px] max-w-[100px] mx-auto">
                        {" "}
                        {/* Növelt szélesség */}
                        {bestResults?.map((eventResult, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded px-1.5 py-1.5 text-xs border border-gray-200 dark:border-gray-600 shadow-sm" /* Növelt padding */
                            title={`${eventResult.eventId}: ${eventResult.ranking}. helyezés`}
                          >
                            <span
                              className={`cubing-icon event-${
                                eventResult.eventId
                              } w-3.5 h-3.5 ${getEventColor(
                                eventResult.eventId
                              )} shrink-0`} /* Növelt ikon */
                            />
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-xs leading-none">
                              {" "}
                              {/* leading-none a vertikális igazításhoz */}
                              {eventResult.ranking}
                            </span>
                          </div>
                        ))}
                        {!bestResults && (
                          <span className="text-gray-400 text-xs text-center col-span-2 py-2">
                            -
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
