import { useTranslations } from "next-intl";

interface ErrorDisplayProps {
  error: string;
  className?: string;
}

export default function ErrorDisplay({
  error,
  className = "",
}: ErrorDisplayProps) {
  const t = useTranslations("Errors");
  return (
    <div className={`${className} p-4 text-center`}>
      <div className="text-red-600 dark:text-red-400">
        {t("FetchError")} {error}
      </div>
    </div>
  );
}
