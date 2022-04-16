export interface SeasonInterface {
  id: string;
  slug: string;
  name: string;
  year: string;
  startAt: Date;
  endAt?: Date;
}
