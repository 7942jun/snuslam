import { User } from './user';
import { Team } from './team';

export class Tournament {
  id: number;
  title: string;
  host: User;
  teams: Team[];
  game_type: number;
  max_team: number;
  result: Team[];
  reward: string;
  admin_approval: boolean;
}
