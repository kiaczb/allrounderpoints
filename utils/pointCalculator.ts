import MinHeap from "heap-js";
export interface CompetitionResult {
  id: number;
  round_id: number;
  pos: number;
  best: number;
  average: number;
  name: string;
  country_iso2: string;
  competition_id: string;
  event_id: string;
  round_type_id: string;
  format_id: string;
  wca_id: string;
  attempts: number[];
  best_index: number;
  worst_index: number;
  regional_single_record: string | null;
  regional_average_record: string | null;
}

interface IPersonResults {
  //competitions: Map<string, Map<string, IEventResult>>,
  wcaId: string;
  name: string;
  bestResults: MinHeap<IEventResult>;
  totalPoints: number;
}

export interface IEventResult {
  competitionId: string;
  eventId: string;
  roundType: string;
  ranking: number;
  point: number;
}

export function getResults(
  competitionsResults: CompetitionResult[][],
  POINTS_TABLE: number[],
  COUNTING_RESULTS: number,
) {
  const personResults = new Map<string, IPersonResults>();

  const seen = new Set<string>();

  for (const competitionResults of competitionsResults) {
    let invalidResultCount = 0;
    let prevEvent = "";

    for (let i = competitionResults.length - 1; i >= 0; i--) {
      const result = competitionResults[i];

      if (prevEvent !== result.event_id) {
        invalidResultCount = 0;
        prevEvent = result.event_id;
      }

      if (result.best < 0) {
        invalidResultCount++;
        continue;
      }

      if (result.pos > POINTS_TABLE.length + invalidResultCount) {
        continue;
      }

      const key = `${result.wca_id}-${result.competition_id}-${result.event_id}`;

      if (seen.has(key)) {
        continue;
      }
      seen.add(key);

      addResultToPerson(
        personResults,
        result,
        invalidResultCount,
        POINTS_TABLE,
        COUNTING_RESULTS,
      );
    }
  }

  return personResults;
}

function addResultToPerson(
  personResults: Map<string, IPersonResults>,
  result: CompetitionResult,
  invalidResultCount: number,
  POINTS_TABLE: number[],
  COUNTING_RESULTS: number,
) {
  let person = personResults.get(result.wca_id);

  if (!person) {
    person = {
      wcaId: result.wca_id,
      name: result.name,
      bestResults: new MinHeap<IEventResult>((a, b) => a.point - b.point),
      totalPoints: 0,
    };
    personResults.set(result.wca_id, person);
  }

  const pointsIndex =
    result.pos > POINTS_TABLE.length
      ? result.pos - invalidResultCount - 1
      : result.pos - 1;
  if (pointsIndex < 0 || pointsIndex >= POINTS_TABLE.length) {
    return;
  }

  const resultPoint = POINTS_TABLE[pointsIndex];

  const eventResult: IEventResult = {
    competitionId: result.competition_id,
    eventId: result.event_id,
    roundType: result.round_type_id,
    ranking: result.pos,
    point: resultPoint,
  };

  const heap = person.bestResults;

  if (heap.size() < COUNTING_RESULTS) {
    heap.push(eventResult);
    person.totalPoints += resultPoint;
  } else if (heap.peek()!.point < resultPoint) {
    const removed = heap.pop()!;
    person.totalPoints -= removed.point;

    heap.push(eventResult);
    person.totalPoints += resultPoint;
  }
}
