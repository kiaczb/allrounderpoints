// app/page.tsx
import { allRounderIdsByYear, availableYears } from "../utils/competitionIds";
import ResultsTable from "./components/PointsTable/ReultsTable";
import YearPicker from "./components/YearPicker";

interface HomeProps {
  searchParams: {
    year?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  // Alapértelmezett év: 2025 vagy URL-ből
  const params = await searchParams;
  const selectedYear = params.year || "2025";

  // Kiválasztott év verseny adatai
  const competitionData =
    allRounderIdsByYear[selectedYear as keyof typeof allRounderIdsByYear] ||
    allRounderIdsByYear["2025"];

  return (
    <main className="min-h-screen">
      <div className="mx-3 px-3 py-6 ">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All-Rounder Verseny Eredmények
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">Év:</span>
            <YearPicker
              selectedYear={selectedYear}
              availableYears={availableYears}
            />
          </div>
        </div>
        <ResultsTable competitionData={competitionData} className="w-full" />
      </div>
    </main>
  );
}
