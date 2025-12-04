interface ErrorDisplayProps {
  error: string;
  className?: string;
}

export default function ErrorDisplay({
  error,
  className = "",
}: ErrorDisplayProps) {
  return (
    <div className={`${className} p-4 text-center`}>
      <div className="text-red-600 dark:text-red-400">
        Hiba történt az adatok betöltése közben: {error}
      </div>
    </div>
  );
}
