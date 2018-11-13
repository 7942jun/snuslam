export class Room {
  id: number;
  title: string;
  host_id: number;
  guests_id: number[];
  location: string;
  play_time: number;
  creation_time: Date;
  type: number;
  ingame: boolean;
}
