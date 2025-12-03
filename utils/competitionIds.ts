// utils/competitionIds.ts
export const allRounderIds2025: Record<string, string> = {
  HungarianAllRounder1Avengers2025: "Avengers",
  HungarianAllRounder2Frozen2025: "Frozen",
  HungarianAllRounder3Minions2025: "Minions",
  HungarianAllRounder4Macskafo2025: "Macskafogó",
  HungarianAllRounder5StarWars2025: "Star Wars",
  HungarianAllRounder62025: "Tom & Jerry",
  HungarianAllRounder72025: "Néma filmek",
  HungarianAllRounder82025: "Egri csillagok",
  HungarianAllRounder92025: "Kis vakondok",
  HungarianAllRounder102025: "Pityke őrmester",
  HungarianAllRounder112025: "Pom Pom meséi",
  HungarianAllRounder122025: "Reszkessetek, betörők!",
};

export const allRounderIds2024: Record<string, string> = {
  HungarianAllRounder12024: "The Saga Begins",
  HungarianAllRounder22024: "Second Chance",
  HungarianAllRounder32024: "A Kind of Magic",
  HungarianAllRounder42024: "Holiday",
  HungarianAllRounder52024: "With or Without You",
  HungarianAllRounder62024: "Shape of You",
  HungarianAllRounder72024: "Egy Elfelejtett Szó",
  HungarianAllRounder82024: "Iskolatáska",
  HungarianAllRounder92024: "November Rain",
  HungarianAllRounder102024: "See You Again",
};

export interface AllRounderYearData {
  ids: Record<string, string>;
  POINTS_TABLE: number[];
  COUNTING_RESULTS: number;
}

export const allRounderIdsByYear: Record<string, AllRounderYearData> = {
  "2024": {
    ids: allRounderIds2024,
    POINTS_TABLE: [
      50, 43, 38, 34, 30, 27, 24, 21, 18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1,
    ],
    COUNTING_RESULTS: 30,
  },
  "2025": {
    ids: allRounderIds2025,
    POINTS_TABLE: [
      50, 43, 38, 34, 30, 27, 24, 21, 18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1,
    ],
    COUNTING_RESULTS: 50,
  },
};

// Elérhető évek
export const availableYears = Object.keys(allRounderIdsByYear).sort().reverse();
