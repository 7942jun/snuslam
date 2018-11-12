export class User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  position: string;
  wins: number;
  loses: number;
  teams_id: number[];
  point: number;
  team: number; // 0: no team ,  1: red team, 2: blue team
}
