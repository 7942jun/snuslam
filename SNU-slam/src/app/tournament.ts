export class Tournament {
  id: number;
  title: string;
  host: number;
  teams_id: number[];
  game_type: number;
  max_team: number;
  result_id: number[];
  reward: string;
  admin_approval: boolean;
}
