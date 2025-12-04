interface TableHeaderProps {
  competitionData: {
    ids: Record<string, string>;
  };
}

export default function TableHeader({ competitionData }: TableHeaderProps) {
  return (
    <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
      <tr>
        <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-left whitespace-nowrap">
          Helyezés
        </th>
        <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-center">
          Név
        </th>
        <th className="border-b border-gray-300 dark:border-gray-600 px-3 py-3 text-left whitespace-nowrap">
          Pontok
        </th>
        {Object.entries(competitionData.ids).map(
          ([competitionId, competitionName]) => (
            <th key={competitionId} className="">
              <div className="flex items-center gap-1 justify-center m-2">
                <span>{competitionName}</span>
              </div>
            </th>
          )
        )}
      </tr>
    </thead>
  );
}
