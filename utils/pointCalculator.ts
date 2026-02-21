// import { Event, Person, Schedule } from "@wca/helpers";
// import MinHeap from "heap-js";
// import { AllRounderYearData } from "../utils/competitionIds";
// // export interface WCIF {
// //   formatVersion: string;
// //   id: string;
// //   name: string;
// //   shortName: string;
// //   series: any;
// //   persons: Person[];
// //   events: Event[];
// //   schedule: Schedule;
// //   competitorLimit: number;
// //   extensions: any[];
// // }

// export interface CompetitionResult {
//   id: number;
//   round_id: number;
//   pos: number;
//   best: number;
//   average: number;
//   name: string;
//   country_iso2: string;
//   competition_id: string;
//   event_id: string;
//   round_type_id: string;
//   format_id: string;
//   wca_id: string;
//   attempts: number[];
//   best_index: number;
//   worst_index: number;
//   regional_single_record: string | null;
//   regional_average_record: string | null;
// }

// export interface IPersonWithCompetitions {
//   person: Person;
//   position: number;
//   competitions: Map<number, IPersonCompetition>;
//   totalPoints: number;
//   best50Map: Map<string, IEventResult[]>;
// }
// export interface IPersonCompetition {
//   competitionId: string;
//   competitionName: string;
//   EventPoints: Map<string, IEventResult>;
//   totalCompetitionPoints: number;
// }

// export interface IPersonCompetitionResults {
//   //events: Map<string, IPersonCompetitionResultByEvent>;
//   competitions: Map<string, Map<string, IEventResult>>; //HungarianAllRounder7 events: {333: 10 pont}
//   //events: Map<string, number>; // 333: 10 pont
//   totalPoints: number;
//   bestResults:
// }

// export interface IPersonCompetitionResultByEvent {
//   //eventId: string;
//   position: number;
//   point: number;
// }

// interface IEventResult {
//   //competitionId: string;
//   //eventId: string;
//   ranking: number;
//   point: number;
// }
// // export const pointsLookup = [
// //   50, 43, 38, 34, 30, 27, 24, 21, 18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1,
// // ];
// var thisCOUNTING_RESULTS: number;
// function isValidResult(result: any, eventId: string): boolean {
//   return (
//     result.ranking != null &&
//     result.ranking <= 20 &&
//     //result.average > 0 &&
//     //!["333bf", "444bf", "555bf", "333mbf"].includes(eventId) &&
//     result.best > 0
//   );
// }

// export function getEventPointsForCompetitior(
//   registrantId: number,
//   registeredEventIds: string[],
//   events: Event[],
//   competitionId: string,
// ): Map<string, IEventResult> {
//   var eventPoints = new Map<string, IEventResult[]>();
//   for (const event of events) {
//     var personHasValidResultFromFinal = false;
//     if (!registeredEventIds.includes(event.id)) continue;
//     if (event.rounds.length === 0) continue;

//     for (const result of event.rounds[event.rounds.length - 1].results) {
//       if (
//         result.personId === registrantId &&
//         result.ranking != null &&
//         isValidResult(result, event.id)
//       ) {
//         const eventResult: IEventResult = {
//           eventId: event.id,
//           ranking: result.ranking,
//           point: POINTS_LOOKUP[result.ranking - 1],
//           competitionId,
//         };
//         eventPoints.set(event.id, eventResult);
//         //eventPoints.set(event.id, result.ranking);
//         personHasValidResultFromFinal = true;
//       }
//     }

//     if (
//       event.rounds.length > 1 &&
//       event.rounds[event.rounds.length - 1].results.length < 20 && //Less than 20 competitiors in final
//       !personHasValidResultFromFinal
//     ) {
//       for (const result of event.rounds[event.rounds.length - 2].results) {
//         if (
//           result.personId === registrantId &&
//           result.ranking != null &&
//           result.ranking > //12
//             event.rounds[event.rounds.length - 1].results.length &&
//           isValidResult(result, event.id)
//         ) {
//           if (result.personId === 1) {
//             result.ranking - 1;
//           }
//           const eventResult: IEventResult = {
//             eventId: event.id,
//             ranking: result.ranking,
//             point: POINTS_LOOKUP[result.ranking - 1],
//             competitionId,
//           };
//           eventPoints.set(event.id, eventResult);
//           //eventPoints.set(event.id, result.ranking);
//         }
//       }
//     }
//   }
//   return eventPoints;
// }

// export function getTotalEventPoints(eventPoints: Map<string, IEventResult>) {
//   if (!eventPoints) return 0;
//   return Array.from(eventPoints.values()).reduce(
//     (sum, result) => sum + result.point,
//     0,
//   );
// }

// function addResultToPerson(
//   personResults: Map<string, IPersonCompetitionResults>,
//   result: CompetitionResult,
//   invalidResultCount: number,
//   POINTS_TABLE: number[],
// ) {
//   let person = personResults.get(result.wca_id);

//   if (!person) {
//     person = {
//       events: new Map<string, Map<string, number>>(),
//       totalPoints: 0,
//     };
//     personResults.set(result.wca_id, person);
//   }

//   // ha már van eredménye erre az eventre, nem csinálunk semmit
//   if (person.events.has(result.event_id)) {
//     return;
//   }

//   const resultPoint = POINTS_TABLE[result.pos - invalidResultCount - 1];

//   person.events.set(result.event_id, resultPoint);

//   person.totalPoints += resultPoint;
// }

// export interface ICompetitionsByPerson {
//   best50: Map<string, IPersonCompetitionResults>;
// }

// export function getPointsForARSeries(
//   competitionsResults: CompetitionResult[][],
//   POINTS_TABLE: number[],
//   COUNTING_RESULTS: number,
// ): Map<string, IPersonWithCompetitions> {
//   const personResultsOnACompetition = new Map<
//     string,
//     IPersonCompetitionResults
//   >();
//   for (const competitionResults of competitionsResults) {
//     let invalidResultCount = 0;
//     let prevEvent = "";
//     for (let i = competitionResults.length - 1; i >= 0; i--) {
//       const result = competitionResults[i];

//       if (prevEvent !== result.event_id) {
//         invalidResultCount = 0;
//         prevEvent = result.event_id;
//       }
//       if (result.best < 0) {
//         invalidResultCount++;
//         continue;
//       }
//       //FELTÉTELEZZÜK HOGY A DÖNTŐBEN NEM LEHET TÖBB EMBER MINT A COUNTING_RESULTS
//       if (result.pos <= COUNTING_RESULTS + invalidResultCount) {
//         continue;
//       }

//       addResultToPerson(
//         personResultsOnACompetition,
//         result,
//         invalidResultCount,
//         POINTS_TABLE,
//       );
//     }
//   }

//   let competitionIndex = 0;

//   for (const competitionWCIF of competitionsWCIF) {
//     for (const person of competitionWCIF.persons) {
//       if (!person.wcaId) continue;

//       const eventPoints = getEventPointsForCompetitior(
//         person.registrantId,
//         person.registration?.eventIds || [],
//         competitionWCIF.events,
//         competitionWCIF.id,
//       );

//       // Ezt még tárolhatod, ha szükséges vizuálisan.
//       const personComp: IPersonCompetition = {
//         competitionId: competitionWCIF.id,
//         competitionName: competitionWCIF.name,
//         EventPoints: eventPoints,
//         totalCompetitionPoints: getTotalEventPoints(eventPoints),
//       };

//       // Ha nem létezik, inicializáljuk
//       if (!personPositions.has(person.wcaId)) {
//         personPositions.set(person.wcaId, {
//           person,
//           position: 0,
//           competitions: new Map([[competitionIndex, personComp]]),
//           totalPoints: 0,
//           best50Map: new Map<string, IEventResult[]>(),
//         });
//       } else {
//         const existingPerson = personPositions.get(person.wcaId)!;
//         existingPerson.competitions.set(competitionIndex, personComp);
//       }

//       const personEntry = personPositions.get(person.wcaId)!;

//       // Heap ideiglenesen a top50 kiválasztásához
//       const heap = new MinHeap<IEventResult>((a, b) => a.point - b.point);
//       // előző top50 + mostani verseny eredményei
//       const allResults = [
//         ...Array.from(personEntry.best50Map.values()).flat(),
//         ...eventPoints.values(),
//       ];

//       for (const result of allResults) {
//         if (heap.size() < thisCOUNTING_RESULTS) {
//           heap.push(result);
//         } else if (result.point > heap.peek()!.point) {
//           heap.replace(result);
//         }
//       }

//       const top50Array = heap.toArray();

//       // Heapből Map előállítása: competitionId -> IEventResult[]
//       const best50Map = new Map<string, IEventResult[]>();
//       for (const res of top50Array) {
//         if (!best50Map.has(res.competitionId)) {
//           best50Map.set(res.competitionId, []);
//         }
//         best50Map.get(res.competitionId)!.push(res);
//       }

//       personEntry.best50Map = best50Map;
//       personEntry.totalPoints = heap
//         .toArray()
//         .reduce((sum, r) => sum + r.point, 0);
//     }

//     competitionIndex++;
//   }

//   return personPositions;
// }
