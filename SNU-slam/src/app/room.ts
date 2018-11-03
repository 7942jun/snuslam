import { User } from './user';

export class Room {
  id: number;
  title: string;
  host: User;
  guests: User[];
  location: string;
  play_time: number;
  creation_time: Date;
  game_type: number;
}
