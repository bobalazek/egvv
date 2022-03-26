export interface EventInterface {
  name: string;
  slug: string;
  round: number;
  laps: number;
  lapDistance: number;
  circuitName: string;
  url: string;
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
