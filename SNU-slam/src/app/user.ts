import { Team } from './team';

export class User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  position: string;
  wins: number;
  loses: number;
  teams: Team[];
  point: number;
}
