import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const room = [
            { id: 0, title: 'room_0', host_id: 1, guests_id: [2,3,4], location: 'eng' , play_time: 60, creation_time: new Date("2015-03-25") , game_type: 2},
            { id: 5, title: 'room_5', host_id: 5, guests_id: [], location: 'nat', play_time: 120, creation_time: new Date("2015-04-25"), game_type: 3}
        ];
        const tournament = [
            { id: 1, title: 'tournament_1', host: 1, teams: [1, 2, 3, 4], game_type: 3, total_team: 4, result: [1, 1], reward: 'money', state: '1' },
            { id: 2, title: 'tournament_2', host: 2, teams: [4, 2, 1, 3], game_type: 5, totla_team: 8, result: [1, 1], reward: 'haksik', state: '2' },
            { id: 3, title: 'tournament_3', host: 3, teams: [1, 4, 5, 6], game_type: 3, total_team: 4, result: [1, 1], reward: 'ice cream', state: '3' }
        ];
        const team = [
            { id: 1, name: 'team_1', leader_id: 1, members_id: [2,3,4], tournament_id:1}

        ];
        const user = [
            { id: 1, email: 'swpp1@snu.ac.kr', password: '11', nickname : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000 },
            { id: 2, email: 'swpp2@snu.ac.kr', password: '11', nickname : 'user_2', position: 'pf', wins: 5, loses: 3, teams_id: [1], point: 1200 },
            { id: 3, email: 'swpp3@snu.ac.kr', password: '11', nickname : 'user_3', position: 'sf', wins: 4, loses: 5, teams_id: [1], point: 1400 },
            { id: 4, email: 'swpp4@snu.ac.kr', password: '11', nickname : 'user_4', position: 'sg', wins: 2, loses: 4, teams_id: [1], point: 700 },
            { id: 5, email: 'swpp5@snu.ac.kr', password: '11', nickname : 'user_5', position: 'pg', wins: 2, loses: 2, teams_id: [], point: 900 }
        ];
        return {room,tournament, team, user};
      }
    }

      
