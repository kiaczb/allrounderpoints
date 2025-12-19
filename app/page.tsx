// app/page.tsx
import { getTranslations } from "next-intl/server";
import { allRounderIdsByYear, availableYears } from "../utils/competitionIds";
import ResultsTable from "./components/PointsTable/ResultsTable";
import YearPicker from "./components/YearPicker";
import Modal from "./components/Modal/Modal";

interface HomeProps {
  searchParams: {
    year?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const t = await getTranslations("Home");

  const params = await searchParams;
  const selectedYear = params.year || "2025";

  const competitionData =
    allRounderIdsByYear[selectedYear as keyof typeof allRounderIdsByYear] ||
    allRounderIdsByYear["2025"];

  return (
    <main className="min-h-screen">
      <div className="mx-3 px-3 py-6 ">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t("Header")}
            </h1>

            <Modal />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">
              {t("YearPickerLabel")}
            </span>
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
