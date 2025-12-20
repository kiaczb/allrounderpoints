"use client";

import { useState, useEffect } from "react";
import { getPointsForARSeries } from "@/utils/pointCalculator";
import { AllRounderYearData } from "@/utils/competitionIds";

export default function useCompetitionData(
  competitionData: AllRounderYearData
) {
  const [peopleArray, setPeopleArray] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentYearKey, setCurrentYearKey] = useState<string>("");

  const getYearKey = (data: AllRounderYearData) => {
    return Object.keys(data.ids).sort().join("-");
  };

  useEffect(() => {
    const newYearKey = getYearKey(competitionData);

    if (newYearKey !== currentYearKey) {
      setPeopleArray([]);
      setCurrentYearKey(newYearKey);
      setError(null);
      setLoading(true);
    }

    const fetchData = async () => {
      if (getYearKey(competitionData) !== newYearKey) return;

      try {
        const competitionIds = Object.keys(competitionData.ids ?? {});

        const results = await Promise.allSettled(
          competitionIds.map(async (competitionId) => {
            const res = await fetch(
              `https://www.worldcubeassociation.org/api/v0/competitions/${competitionId}/wcif/public`,
              { next: { revalidate: 300 } }
            );

            if (!res.ok) {
              throw new Error(`Invalid competitionId: ${competitionId}`);
            }

            return res.json();
          })
        );

        // only successful fetches
        const fetchedResults = results
          .filter(
            (r): r is PromiseFulfilledResult<any> => r.status === "fulfilled"
          )
          .map((r) => r.value);

        //no successful fetches
        if (fetchedResults.length === 0) {
          setPeopleArray([]);
          return;
        }

        const personPositions = getPointsForARSeries(
          fetchedResults,
          competitionData.POINTS_TABLE,
          competitionData.COUNTING_RESULTS
        );

        const sortedPeople = Array.from(personPositions.values())
          .filter((p) => p.totalPoints > 0)
          .sort((a, b) => b.totalPoints - a.totalPoints);

        setPeopleArray(sortedPeople);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching competition data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [competitionData, currentYearKey]);

  const getYearKeyForProps = () => getYearKey(competitionData);

  return {
    peopleArray,
    loading,
    error,
    currentYearKey,
    getYearKeyForProps,
  };
}
