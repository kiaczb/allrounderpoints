"use client";

import { useRouter } from "next/navigation";

interface YearPickerProps {
  selectedYear: string;
  availableYears: string[];
}

export default function YearPicker({
  selectedYear,
  availableYears,
}: YearPickerProps) {
  const router = useRouter();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    router.push(`?year=${year}`);
  };

  return (
    <select
      value={selectedYear}
      onChange={handleYearChange}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    >
      {availableYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
