import { IEventResult } from "@/utils/pointCalculator";
import "@cubing/icons";
import { useTranslations } from "next-intl";

interface EventCellProps {
  results: IEventResult[];
}

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

export default function EventCell({ results }: EventCellProps) {
  const t = useTranslations("EventCell");

  if (!results || results.length === 0) {
    return (
      <span className="text-gray-400 text-xs text-center col-span-2 py-2">
        -
      </span>
    );
  }

  return (
    <>
      {results.map((eventResult: any, index: number) => (
        <div
          key={index}
          className={`flex items-center ${
            eventResult.ranking >= 10 ? "gap-0.5" : "gap-1"
          } bg-white dark:bg-gray-800 rounded px-1.5 py-1.5 text-xs border border-gray-200 dark:border-gray-600 shadow-sm`}
          title={`${eventResult.eventId}: ${t("Positons", {
            position: eventResult.ranking,
          })}`}
        >
          <span
            className={`cubing-icon event-${
              eventResult.eventId
            } w-3.5 h-3.5 ${getEventColor(eventResult.eventId)} shrink-0`}
          />
          <span className="font-medium text-gray-800 dark:text-gray-200 text-xs leading-none">
            {eventResult.ranking}
          </span>
        </div>
      ))}
    </>
  );
}
