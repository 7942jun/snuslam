export class Tournament {
  id: number;
  title: string;
  host: number;
  teams: number[];
  game_type: number; // value means the number of members in a team.
  total_team: number; // value means the number of total teams in a tournament.
  result: number[];
  reward: string;
  state: number; // state of tournament. 1: 승인 중, 2: 신청 중, 3: 진행 중, 4: 종료
}

