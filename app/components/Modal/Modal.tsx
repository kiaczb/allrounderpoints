"use client";

import { useState, useTransition } from "react";
import ModalWrapper from "./ModalWrapper";
import { useTranslations } from "next-intl";
import { AllRounderYearData } from "@/utils/competitionIds";

const Modal = ({
  competitionData,
}: {
  competitionData: AllRounderYearData;
}) => {
  const t = useTranslations("Modal");
  const [open, setOpen] = useState(false);
  const firstHalf = competitionData.POINTS_TABLE.slice(0, 10);
  const secondHalf = competitionData.POINTS_TABLE.slice(10, 20);
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          width="26px"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className="text-gray-900 hover:text-gray-600 hover:cursor-pointer dark:text-white dark:hover:text-gray-300 dark:hover:cursor-pointer transition-colors"
        >
          <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26 26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </button>

      {open && (
        <ModalWrapper onClose={() => setOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t("Title")}</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                {t("TopPositions", {
                  POINTS_TABLE_LENGTH: competitionData.POINTS_TABLE.length,
                })}
              </li>
              <li>
                {t("CountingResults", {
                  COUNTING_RESULTS: competitionData.COUNTING_RESULTS,
                })}
              </li>
              <li>
                {t("PodiumCount", {
                  PODIUM_COUNT: competitionData.PODIUM_COUNT,
                })}
              </li>
            </ul>

            <div className="mt-3 max-h-[20vh] overflow-y-auto">
              <table className="w-full border border-gray-300 dark:border-gray-700 text-center">
                <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 border-b">Place</th>
                    <th className="px-3 py-2 border-b">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {competitionData.POINTS_TABLE.map((point, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="border-b">{index + 1}</td>
                      <td className="border-b">{point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
