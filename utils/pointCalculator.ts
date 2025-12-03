import { Event, Person, Schedule } from "@wca/helpers";
import MinHeap from "heap-js";
import { AllRounderYearData } from "../utils/competitionIds";
export interface WCIF {
  formatVersion: string;
  id: string;
  name: string;
  shortName: string;
  series: any;
  persons: Person[];
  events: Event[];
  schedule: Schedule;
  competitorLimit: number;
  extensions: any[];
}

export interface IPersonWithCompetitions {
  person: Person;
  position: number;
  competitions: Map<number, IPersonCompetition>;
  totalPoints: number;
  best50Map: Map<string, IEventResult[]>;
}
export interface IPersonCompetition {
  competitionId: string;
  competitionName: string;
  EventPoints: Map<string, IEventResult>;
  totalCompetitionPoints: number;
}
interface IEventResult {
  competitionId: string;
  eventId: string;
  ranking: number;
  point: number;
}
// export const pointsLookup = [
//   50, 43, 38, 34, 30, 27, 24, 21, 18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1,
// ];
var POINTS_LOOKUP: number[];
var thisCOUNTING_RESULTS: number;
function isValidResult(result: any, eventId: string): boolean {
  return (
    result.ranking != null &&
    result.ranking <= 20 &&
    //result.average > 0 &&
    //!["333bf", "444bf", "555bf", "333mbf"].includes(eventId) &&
    result.best > 0
  );
}

export function getEventPointsForCompetitior(
  registrantId: number,
  registeredEventIds: string[],
  events: Event[],
  competitionId: string
): Map<string, IEventResult> {
  var eventPoints = new Map<string, IEventResult>();
  for (const event of events) {
    var personHasValidResultFromFinal = false;
    if (!registeredEventIds.includes(event.id)) continue;
    if (event.rounds.length === 0) continue;

    for (const result of event.rounds[event.rounds.length - 1].results) {
      if (
        result.personId === registrantId &&
        result.ranking != null &&
        isValidResult(result, event.id)
      ) {
        const eventResult: IEventResult = {
          eventId: event.id,
          ranking: result.ranking,
          point: POINTS_LOOKUP[result.ranking - 1],
          competitionId,
        };
        eventPoints.set(event.id, eventResult);
        //eventPoints.set(event.id, result.ranking);
        personHasValidResultFromFinal = true;
      }
    }

    if (
      event.rounds.length > 1 &&
      event.rounds[event.rounds.length - 1].results.length < 20 && //Less than 20 competitiors in final
      !personHasValidResultFromFinal
    ) {
      for (const result of event.rounds[event.rounds.length - 2].results) {
        if (
          result.personId === registrantId &&
          result.ranking != null &&
          result.ranking > //12
            event.rounds[event.rounds.length - 1].results.length &&
          isValidResult(result, event.id)
        ) {
          if (result.personId === 1) {
            result.ranking - 1;
          }
          const eventResult: IEventResult = {
            eventId: event.id,
            ranking: result.ranking,
            point: POINTS_LOOKUP[result.ranking - 1],
            competitionId,
          };
          eventPoints.set(event.id, eventResult);
          //eventPoints.set(event.id, result.ranking);
        }
      }
    }
  }
  return eventPoints;
}

export function getTotalEventPoints(eventPoints: Map<string, IEventResult>) {
  if (!eventPoints) return 0;
  return Array.from(eventPoints.values()).reduce(
    (sum, result) => sum + result.point,
    0
  );
}

export function getPointsForARSeries(
  competitionsWCIF: WCIF[],
  POINTS_TABLE: number[],
  COUNTING_RESULTS: number
): Map<string, IPersonWithCompetitions> {
  POINTS_LOOKUP = POINTS_TABLE;
  thisCOUNTING_RESULTS = COUNTING_RESULTS;
  let competitionIndex = 0;
  const personPositions = new Map<string, IPersonWithCompetitions>();

  for (const competitionWCIF of competitionsWCIF) {
    for (const person of competitionWCIF.persons) {
      if (!person.wcaId) continue;

      const eventPoints = getEventPointsForCompetitior(
        person.registrantId,
        person.registration?.eventIds || [],
        competitionWCIF.events,
        competitionWCIF.id
      );

      // Ezt még tárolhatod, ha szükséges vizuálisan.
      const personComp: IPersonCompetition = {
        competitionId: competitionWCIF.id,
        competitionName: competitionWCIF.name,
        EventPoints: eventPoints,
        totalCompetitionPoints: getTotalEventPoints(eventPoints),
      };

      // Ha nem létezik, inicializáljuk
      if (!personPositions.has(person.wcaId)) {
        personPositions.set(person.wcaId, {
          person,
          position: 0,
          competitions: new Map([[competitionIndex, personComp]]),
          totalPoints: 0,
          best50Map: new Map<string, IEventResult[]>(),
        });
      } else {
        const existingPerson = personPositions.get(person.wcaId)!;
        existingPerson.competitions.set(competitionIndex, personComp);
      }

      const personEntry = personPositions.get(person.wcaId)!;

      // Heap ideiglenesen a top50 kiválasztásához
      const heap = new MinHeap<IEventResult>((a, b) => a.point - b.point);
      // előző top50 + mostani verseny eredményei
      const allResults = [
        ...Array.from(personEntry.best50Map.values()).flat(),
        ...eventPoints.values(),
      ];

      for (const result of allResults) {
        if (heap.size() < thisCOUNTING_RESULTS) {
          heap.push(result);
        } else if (result.point > heap.peek()!.point) {
          heap.replace(result);
        }
      }

      const top50Array = heap.toArray();

      // Heapből Map előállítása: competitionId -> IEventResult[]
      const best50Map = new Map<string, IEventResult[]>();
      for (const res of top50Array) {
        if (!best50Map.has(res.competitionId)) {
          best50Map.set(res.competitionId, []);
        }
        best50Map.get(res.competitionId)!.push(res);
      }

      personEntry.best50Map = best50Map;
      personEntry.totalPoints = heap
        .toArray()
        .reduce((sum, r) => sum + r.point, 0);
    }

    competitionIndex++;
  }

  return personPositions;
}
