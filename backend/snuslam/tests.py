from django.test import TestCase, Client
import json

class ModelTestCase(TestCase):
	def test_models(self):
		from .models import User, Room, Team, Tournament

		user = User(email='7942jun@naver.com', password='1234', nickname='raa', position='point guard')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', nickname='python', position='center')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', nickname='angular', position='power forward')
		user3.save()
		self.assertEqual(User.objects.all().count(), 3)
		self.assertEqual(User.objects.get(id=1).password, '1234')
		self.assertEqual(User.objects.get(id=1).email, '7942jun@naver.com')
		self.assertEqual(User.objects.get(id=1).nickname, 'raa')
		self.assertEqual(User.objects.get(id=1).position, 'point guard')
		
		for User in User.objects.all():
			self.assertEqual(User.wins, 0)
			self.assertEqual(User.loses, 0)
			self.assertEqual(User.point, 0)

		room = Room(title='room1!', host=user, location='302', play_time=30, type=6)
		room.save()
		room2 = Room(title='room2!', host=user2, location='dormitory', play_time=15, type=4)
		room2.save()
		self.assertEqual(Room.objects.all().count(), 2)
		self.assertEqual(Room.objects.get(id=1).title, 'room1!')
		self.assertEqual(Room.objects.get(id=1).host.nickname, 'raa')
		self.assertEqual(Room.objects.get(id=1).location, '302')
		self.assertEqual(Room.objects.get(id=1).play_time, 30)
		self.assertEqual(Room.objects.get(id=1).type, 6)

		for room in Room.objects.all():
			self.assertEqual(room.guests.count(), 0)
		
		import datetime
		self.assertIs(type(room.getDate()), datetime.datetime)

		team = Team(name='team1', leader=user)
		team.save()
		team2 = Team(name='team2', leader=user2)
		team2.save()

		self.assertEqual(Team.objects.all().count(), 2)
		self.assertEqual(Team.objects.get(id=1).name, 'team1')
		self.assertEqual(Team.objects.get(id=1).leader, user)
		self.assertEqual(Team.objects.get(id=1).members.count(), 0)

		tournament = Tournament(title='My Life for Aiur', host=user, type=8, reward='$1000')
		tournament.save()

		self.assertEqual(Tournament.objects.all().count(), 1)
		self.assertEqual(Tournament.objects.get(id=1).title, 'My Life for Aiur')
		self.assertEqual(Tournament.objects.get(id=1).host, user)
		self.assertEqual(Tournament.objects.get(id=1).teams.count(), 0)
		self.assertEqual(Tournament.objects.get(id=1).type, 8)
		self.assertEqual(Tournament.objects.get(id=1).reward, '$1000')

class RoomTestCase(TestCase):
	def setUp(self):
		from .models import User, Room

		user = User(email='7942jun@naver.com', password='1234', nickname='raa', position='point guard')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', nickname='python', position='center')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', nickname='angular', position='power forward')
		user3.save()
		room = Room(title='room1!', host=user, location='302', play_time=30, type=6)
		room.save()
		room2 = Room(title='room2!', host=user2, location='dormitory', play_time=15, type=4)
		room2.save()

	def test_room(self):
		from .models import User
		from django.forms.models import model_to_dict
		client = Client()
		user3 = User.objects.get(id=3)

		#'/room'의 get이 잘 작동하는지 확인
		response = client.get('/api/room')
		self.assertEqual(response.status_code, 200)
		
		#'/room'에 get 이외의 요청이 잘 처리되는지 확인
		response = client.delete('/api/room')
		self.assertEqual(response.status_code, 405)
	
		#'/room/create'에 post가 잘 작동하는지 확인
		user3_dict = model_to_dict(user3)
		response = client.post('/api/room/create', json.dumps({'title':'room3!', 'host':user3_dict, 'location':'somewhere', 'play_time':20, 'type':8}), content_type='application/json')
		self.assertEqual(response.status_code, 201)

		#'/room/create'에 post 이외의 요청이 잘 처리되는지 확인
		response = client.get('/api/room/create')
		self.assertEqual(response.status_code, 405)

		#'/room/detail/:id'에 get이 잘 작동하는지 확인
		response = client.get('/api/room/detail/3')
		self.assertEqual(response.status_code, 200)
		self.assertIn('room3!', response.content.decode())

		#'/room/detail/:id'에 존재하지 않는 데이터에 대한 get이 잘 처리되는지 확인
		response = client.get('/api/room/detail/4')
		self.assertEqual(response.status_code, 404)

		#'/room/detail/:id'에 put이 잘 작동하는지 확인
		response = client.put('/api/room/detail/1', json.dumps(model_to_dict(user3)), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		response = client.get('/api/room/detail/1')
		self.assertEqual(len(json.loads(response.content.decode()).get('guests')), 1)
		
		#'/room/detail/:id'에 존재하지 않는 데이터에 대한 put이 잘 처리되는지 확인
		response = client.put('/api/room/detail/4')
		self.assertEqual(response.status_code, 404)

		#'/room/detail/:id'에 delete가 잘 작동하는지 확인
		response = client.delete('/api/room/detail/3')
		self.assertEqual(response.status_code, 200)
		
		#'/room/detail/:id'에 존재하지 않는 데이터에 대한 delete가 잘 처리되는지 확인
		response = client.delete('/api/room/detail/3')
		self.assertEqual(response.status_code, 404)

		#'/room/detail/:id'에 post 요청이 잘 처리되는지 확인
		response = client.post('/api/room/detail/2')
		self.assertEqual(response.status_code, 405)

class TeamTestCase(TestCase):
	def setUp(self):
		from .models import User, Team

		user = User(email='7942jun@naver.com', password='1234', nickname='raa', position='point guard')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', nickname='python', position='center')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', nickname='angular', position='power forward')
		user3.save()
		team = Team(name='team1!', leader=user)
		team.save()
		team2 = Team(name='team2!', leader=user2)
		team2.save()

	def test_team(self):
		client = Client()

		#'/api/team'에 get 요청이 잘 처리되는지 확인
		response = client.get('/api/team')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 2)

		#'/api/team'에 post 요청이 잘 처리되는지 확인
		new_team_json = {'name':'team3!', 'leader':3}
		response = client.post('/api/team', json.dumps(new_team_json), content_type='application/json')
		self.assertEqual(response.status_code, 201)

		#'/api/team'에 get, post 이외의 요청이 잘 처리되는지 확인
		response = client.delete('/api/team')
		self.assertEqual(response.status_code, 405)

		#'/api/team/:id'에 get 요청이 잘 처리되는지 확인
		response = client.get('/api/team/3')
		self.assertEqual(response.status_code, 200)
		self.assertIn('team3!', response.content.decode())

		response = client.get('/api/team/4')
		self.assertEqual(response.status_code, 404)

		#'/api/team/:id'에 put 요청이 잘 처리되는지 확인
		response = client.put('/api/team/1', json.dumps({'user':3}), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		response = client.get('/api/team/1')
		self.assertEqual(len(json.loads(response.content.decode()).get('members')), 1)

		response = client.put('/api/team/4')
		self.assertEqual(response.status_code, 404)

		#'/api/team/:id'에 delete 요청이 잘 처리되는지 확인
		response = client.delete('/api/team/3')
		self.assertEqual(response.status_code, 200)

		response = client.delete('/api/team/3')
		self.assertEqual(response.status_code, 404)

		#'/api/team/:id'에 post 요청이 잘 처리되는지 확인
		response = client.post('/api/team/1')
		self.assertEqual(response.status_code, 405)

class TournamentTestCase(TestCase):
	def setUp(self):
		from .models import User, Team, Tournament

		user = User(email='7942jun@naver.com', password='1234', nickname='raa', position='point guard')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', nickname='python', position='center')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', nickname='angular', position='power forward')
		user3.save()
		team = Team(name='team1!', leader=user)
		team.save()
		team2 = Team(name='team2!', leader=user2)
		team2.save()
		team3 = Team(name='team3!', leader=user3)
		team3.save()
		tournament = Tournament(title='tournament1!', host=user, type=8, reward='reward1')
		tournament.save()
		tournament2 = Tournament(title='tournament2!', host=user2, type=4, reward='reward2')
		tournament2.save()

	def test_tournament(self):
		client = Client()

		#'api/tournament'에 get 요청이 잘처리되는지 확인 
		response = client.get('/api/tournament')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 2)

		#'api/tournament'에 post 요청이 잘 처리되는지 확인
		new_tournament_json = {'title':'tournament3!', 'type':6, 'host':3, 'reward':'reward3'}
		response = client.post('/api/tournament', json.dumps(new_tournament_json), content_type='application/json')
		self.assertEqual(response.status_code, 201)

		#'api/tournament'에 get, post 이외의 요청이 잘 처리되는지 확인
		response = client.delete('/api/tournament')
		self.assertEqual(response.status_code, 405)

		#'api/tournament/:id'에 get 요청이 잘 처리되는지 확인
		response = client.get('/api/tournament/3')
		self.assertEqual(response.status_code, 200)
		self.assertIn('tournament3!', response.content.decode())

		response = client.get('/api/tournament/4')
		self.assertEqual(response.status_code, 404)

		#'api/tournament/:id'에 put 요청이 잘 처리되는지 확인
		response = client.put('/api/tournament/1', json.dumps({'team':3}), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		response = client.get('/api/tournament/1')
		self.assertEqual(len(json.loads(response.content.decode()).get('teams')), 1)

		response = client.put('/api/tournament/4')
		self.assertEqual(response.status_code, 404)

		#'api/tournament/:id'에 delete 요청이 잘 처리되는지 확인
		response = client.delete('/api/tournament/3')
		self.assertEqual(response.status_code, 200)
		response = client.get('/api/tournament/3')
		self.assertEqual(response.status_code, 404)

		response = client.delete('/api/tournament/4')
		self.assertEqual(response.status_code, 404)

		#'api/tournament/:id'에 post 요청이 잘 처리되는지 확인
		response = client.post('/api/tournament/1')
		self.assertEqual(response.status_code, 405)


