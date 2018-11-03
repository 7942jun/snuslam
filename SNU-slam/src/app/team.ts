import { User } from './user';
import { Tournament } from './tournament';

export class Team {
  id: number;
  name: string;
  leader: User;
  members: User[];
  tournament: Tournament;
}
