export interface EventInterface {
  name: string;
  slug: string;
  round: number;
  laps: number;
  lapDistance: number;
  circuitName: string;
  url: string;
  circuitLayout?: string;
}

export interface EventWithSessionsInterface extends EventInterface {
  sessions: EventSessionInterface[];
}

export interface EventsListInterface {
  slug: string;
  type: string;
}

export interface EventSessionInterface {
  name: string;
  type: string;
  startAt: Date;
  endAt: Date;
}

export interface EventRaceInterface {
  name: string;
  url: string;
  date: Date;
  laps: number;
}

export interface EventRaceResultInterface {
  driverNumber: number;
  driverCode: string;
  teamName: string;
  status: string;
  position?: number;
  timeMilliseconds?: number;
  laps?: number;
  lapsBehind?: number;
  points?: number;
}
