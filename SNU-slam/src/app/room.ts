export class Room {
  id: number;
  title: string;
  host: number;
  guests_id: number[];
  location: string;
  play_time: number;
  creation_time: Date;
  type: number;
  ingame: boolean;
}
