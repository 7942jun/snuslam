import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const room = [
            { id: 0, title: 'room_0', host_id: 1, guests_id: [2, 3, 4], location: 'eng' , play_time: 60, creation_time: new Date("2015-03-25") , type: 2, ingame: false },
            { id: 5, title: 'room_5', host_id: 5, guests_id: [], location: 'nat', play_time: 120, creation_time: new Date("2015-04-25"), type: 3, ingame: false}
        ];
        const tournament = [
            { id: 1, title: 'tournament_1', host: 1, teams: [], game_type: 3, total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'money', state: '1' },
            { id: 2, title: 'tournament_2', host: 2, teams: [1, 2, 3, 4, 8, 7, 6, 5], game_type: 5, total_team: 8, result1: [1, 4, -1, 7], result2: [4, -1], result3: [-1], reward: 'haksik', state: '3' },
            { id: 3, title: 'tournament_3', host: 3, teams: [9, 10, 11, 12, 13, 14, 15, 16], game_type: 3, total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'ice cream', state: '3' },
            { id: 4, title: 'tournament_4', host: 4, teams: [], game_type: 3, total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'ice cream', state: '2' }
        ];
        const team = [
            { id: 1, name: 'woojungjjang', leader_id: 1, members_id: [2, 3, 4], tournament_id: 1},
            { id: 2, name: 'jaesonbabo', leader_id: 2, members_id: [2, 3, 4], tournament_id: 1},
            { id: 3, name: 'jisangbabo', leader_id: 3, members_id: [2, 3, 4], tournament_id: 1},
            { id: 4, name: 'zed', leader_id: 4, members_id: [2, 3, 4], tournament_id: 1},
            { id: 5, name: 'leblanc', leader_id: 5, members_id: [2, 3, 4], tournament_id: 1},
            { id: 6, name: 'ari', leader_id: 6, members_id: [2, 3, 4], tournament_id: 1},
            { id: 7, name: 'missfortune', leader_id: 7, members_id: [2, 3, 4], tournament_id: 1},
            { id: 8, name: 'talon', leader_id: 8, members_id: [2, 3, 4], tournament_id: 1},

        ];
        const user = [
            { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 },
            { id: 2, email: 'swpp2@snu.ac.kr', password: '11', username : 'user_2', position: 'pf', wins: 5, loses: 3, teams_id: [1], point: 1200, team: 1 },
            { id: 3, email: 'swpp3@snu.ac.kr', password: '11', username : 'user_3', position: 'sf', wins: 4, loses: 5, teams_id: [1], point: 1400, team: 2 },
            { id: 4, email: 'swpp4@snu.ac.kr', password: '11', username : 'user_4', position: 'sg', wins: 2, loses: 4, teams_id: [1], point: 700, team: 2 },
            { id: 5, email: 'swpp5@snu.ac.kr', password: '11', username : 'user_5', position: 'pg', wins: 2, loses: 2, teams_id: [], point: 900, team: 0 }

        ];
        return {room, tournament, team, user};
      }
    }
