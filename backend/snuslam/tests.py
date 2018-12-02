from django.test import TestCase, Client
import json

class RankTestCase(TestCase):
	def test_rank(self):
		from django.contrib.auth.models import User
		from .models import Profile
		
		user = User(email='7942jun@naver.com', password='1234', username='raa')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', username='python')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', username='angular')
		user3.save()

		client = Client()

		response = client.get('/api/user/rank')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 3)

		response = client.post('/api/user/rank')
		self.assertEqual(response.status_code, 405)

class UserTestCase(TestCase):
	def test_user(self):
		from django.contrib.auth.models import User
		from .models import Profile
		
		client = Client()
		
		#'api/user'에 post 요청이 잘 처리되는지 확인
		new_user_json = {'email':'7942jun@naver.com', 'password':'1234', 'username':'raa', 'position':'guard'}
		response = client.post('/api/user', json.dumps(new_user_json), content_type='application/json')
		self.assertEqual(response.status_code, 201)
		self.assertEqual(1, User.objects.all().count())
		self.assertIn('raa', response.content.decode())

		user = User.objects.get(id=1)
		self.assertEqual(user.profile.position, 'guard')
		
		#'api/user'에 post 이외의 요청이 잘 처리되는지 확인
		response = client.put('/api/user')
		self.assertEqual(response.status_code, 405)

		#'api/user'에 get 요청이 잘 처리되는지 확인
		response = client.get('/api/user')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 1)

		response = client.get('/api/user/1')
		self.assertEqual(response.status_code, 200)
		self.assertIn('raa', response.content.decode())

		response = client.get('/api/user/2')
		self.assertEqual(response.status_code, 404)

		response = client.put('/api/user/1', json.dumps({'team':1}), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(Profile.objects.get(id=1).team, 1)

		response = client.put('/api/user/2')
		self.assertEqual(response.status_code, 404)

		response = client.delete('/api/user/1')
		self.assertEqual(response.status_code, 200)

		response = client.get('/api/user/1')
		self.assertEqual(response.status_code, 404)

		response = client.delete('/api/user/2')
		self.assertEqual(response.status_code, 404)

		response = client.post('/api/user/1')
		self.assertEqual(response.status_code, 405)

class SignInOutTestCase(TestCase):
	def test_sign_in_out(self):
		from django.contrib.auth.models import User
		user = User.objects.create_user(email='1111@gmail.com', password='1234', username='user1')
		user2 = User.objects.create_user(email='2222@gmail.com', password='5678', username='user2')

		client = Client()

		#사용자가 로그인 되어있지 않을 때 sign_out
		response = client.get('/api/sign_out')
		self.assertEqual(response.status_code, 401)
		
		#올바른 sign_in 
		response = client.post('/api/sign_in', json.dumps({'email':'1111@gmail.com', 'password':'1234'}), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		self.assertIn('user1', response.content.decode())

		#사용자가 로그인 되어있을 때 sign_out
		response = client.get('/api/sign_out')
		self.assertEqual(response.status_code, 204)
		
		#email이 틀렸을 때의 sign_in
		response = client.post('/api/sign_in', json.dumps({'email':'1112@gmail.com', 'password':'1234'}), content_type='application/json')
		self.assertEqual(response.status_code, 401)
		
		#password가 틀렸을 때의 sign_in
		response = client.post('/api/sign_in', json.dumps({'email':'2222@gmail.com', 'password':'1234'}), content_type='application/json')
		self.assertEqual(response.status_code, 401)
		
		#'api/sign_in'에 post 이외의 요청이 잘 처리되는지 확인
		response = client.get('/api/sign_in')
		self.assertEqual(response.status_code, 405)

		#'api/sign_out'에 get 이외의 요청이 잘 처리되는지 확인
		response = client.post('/api/sign_out')
		self.assertEqual(response.status_code, 405)
		

class ModelTestCase(TestCase):
	def test_models(self):
		from .models import Profile, Room, Team, Tournament
		from django.contrib.auth.models import User

		user = User(email='7942jun@naver.com', password='1234', username='raa')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', username='python')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', username='angular')
		user3.save()
		self.assertEqual(User.objects.all().count(), 3)
		self.assertEqual(User.objects.get(id=1).password, '1234')
		self.assertEqual(User.objects.get(id=1).email, '7942jun@naver.com')
		self.assertEqual(User.objects.get(id=1).username, 'raa')
		
		for i in User.objects.all():
			self.assertEqual(i.profile.wins, 0)
			self.assertEqual(i.profile.loses, 0)
			self.assertEqual(i.profile.point, 0)
		
		temp1 = User.objects.get(id=1)
		temp1.profile.position = 'guard'
		temp1.save()

		temp2 = User.objects.get(id=1)
		self.assertEqual(temp2.profile.position, 'guard')

		room = Room(title='room1!', host=user, location='302', play_time=30, type=6)
		room.save()
		room2 = Room(title='room2!', host=user2, location='dormitory', play_time=15, type=4)
		room2.save()
		self.assertEqual(Room.objects.all().count(), 2)
		self.assertEqual(Room.objects.get(id=1).title, 'room1!')
		self.assertEqual(Room.objects.get(id=1).host.username, 'raa')
		self.assertEqual(Room.objects.get(id=1).location, '302')
		self.assertEqual(Room.objects.get(id=1).play_time, 30)
		self.assertEqual(Room.objects.get(id=1).type, 6)

		for room in Room.objects.all():
			self.assertEqual(room.guests.count(), 0)

		team = Team(name='team1', leader_id=user)
		team.save()
		team2 = Team(name='team2', leader_id=user2)
		team2.save()

		self.assertEqual(Team.objects.all().count(), 2)
		self.assertEqual(Team.objects.get(id=1).name, 'team1')
		self.assertEqual(Team.objects.get(id=1).leader_id, user)
		self.assertEqual(Team.objects.get(id=1).members_id.count(), 0)

		tournament = Tournament(title='My Life for Aiur', host=1, game_type=8, reward='$1000')
		tournament.save()

		self.assertEqual(Tournament.objects.all().count(), 1)
		self.assertEqual(Tournament.objects.get(id=1).title, 'My Life for Aiur')
		self.assertEqual(Tournament.objects.get(id=1).host, 1)
		self.assertEqual(Tournament.objects.get(id=1).teams.count(), 0)
		self.assertEqual(Tournament.objects.get(id=1).game_type, 8)
		self.assertEqual(Tournament.objects.get(id=1).reward, '$1000')

class RoomTestCase(TestCase):
	def setUp(self):
		from .models import Profile, Room
		from django.contrib.auth.models import User

		user = User(email='7942jun@naver.com', password='1234', username='raa')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', username='python')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', username='angular')
		user3.save()
		room = Room(title='room1!', host=user, location='302', play_time=30, type=6)
		room.save()
		room2 = Room(title='room2!', host=user2, location='dormitory', play_time=15, type=4)
		room2.save()

	def test_room(self):
		client = Client()

		#'/room'의 get이 잘 작동하는지 확인
		response = client.get('/api/room')
		self.assertEqual(response.status_code, 200)
		
		#'/room'에 get, post 이외의 요청이 잘 처리되는지 확인
		response = client.delete('/api/room')
		self.assertEqual(response.status_code, 405)
	
		#'/room'에 post가 잘 작동하는지 확인
		new_room_json = {'title':'room3!', 'host':3, 'location':'somewhere', 'play_time':20, 'type':8}
		response = client.post('/api/room', json.dumps(new_room_json), content_type='application/json')
		self.assertEqual(response.status_code, 201)
		self.assertIn('3', response.content.decode())

		#'/room/:id'에 get이 잘 작동하는지 확인
		response = client.get('/api/room/3')
		self.assertEqual(response.status_code, 200)
		self.assertIn('room3!', response.content.decode())

		#'/room/:id'에 존재하지 않는 데이터에 대한 get이 잘 처리되는지 확인
		response = client.get('/api/room/4')
		self.assertEqual(response.status_code, 404)

		#'/room/:id'에 put이 잘 작동하는지 확인
		response = client.put('/api/room/1', json.dumps({'user':3}), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		response = client.get('/api/room/1')
		self.assertEqual(len(json.loads(response.content.decode()).get('guests')), 1)
		
		#'/room/:id'에 존재하지 않는 데이터에 대한 put이 잘 처리되는지 확인
		response = client.put('/api/room/4')
		self.assertEqual(response.status_code, 404)

		#'/room/:id'에 delete가 잘 작동하는지 확인
		response = client.delete('/api/room/3')
		self.assertEqual(response.status_code, 200)
		
		#'/room/:id'에 존재하지 않는 데이터에 대한 delete가 잘 처리되는지 확인
		response = client.delete('/api/room/3')
		self.assertEqual(response.status_code, 404)

		#'/room/:id'에 post 요청이 잘 처리되는지 확인
		response = client.post('/api/room/2')
		self.assertEqual(response.status_code, 405)

		response = client.get('/api/room/1/user')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 2)

		response = client.post('/api/room/1/user')
		self.assertEqual(response.status_code, 405)

class TeamTestCase(TestCase):
	def setUp(self):
		from .models import Profile, Room, Team
		from django.contrib.auth.models import User


		user = User(email='7942jun@naver.com', password='1234', username='raa')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', username='python')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', username='angular')
		user3.save()
		team = Team(name='team1!', leader_id=user)
		team.save()
		team2 = Team(name='team2!', leader_id=user2)
		team2.save()

	def test_team(self):
		client = Client()

		#'/api/team'에 get 요청이 잘 처리되는지 확인
		response = client.get('/api/team')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 2)

		#'/api/team'에 post 요청이 잘 처리되는지 확인
		new_team_json = {'name':'team3!', 'leader_id':3}
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
		self.assertEqual(len(json.loads(response.content.decode()).get('members_id')), 1)

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
		from .models import Profile, Room, Team, Tournament
		from django.contrib.auth.models import User

		user = User(email='7942jun@naver.com', password='1234', username='raa')
		user.save()
		user2 = User(email='helloworld@gmail.com', password='5678', username='python')
		user2.save()
		user3 = User(email='swpp@snu.ac.kr', password='9010', username='angular')
		user3.save()
		team = Team(name='team1!', leader_id=user)
		team.save()
		team2 = Team(name='team2!', leader_id=user2)
		team2.save()
		team3 = Team(name='team3!', leader_id=user3)
		team3.save()
		tournament = Tournament(title='tournament1!', host=1, game_type=8, reward='reward1')
		tournament.save()
		tournament2 = Tournament(title='tournament2!', host=2, game_type=4, reward='reward2')
		tournament2.save()

	def test_tournament(self):
		client = Client()

		#'api/tournament'에 get 요청이 잘처리되는지 확인 
		response = client.get('/api/tournament')
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(json.loads(response.content.decode())), 2)

		#'api/tournament'에 post 요청이 잘 처리되는지 확인
		new_tournament_json = {'title':'tournament3!', 'game_type':6, 'host':3, 'reward':'reward3'}
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

		#'api/tournament'에 put 요청이 잘 처리되는지 확인
		tournament_json = {'id':1, 'title':'tournament1!', 'host':1, 'teams':[1, 2, 3], 'game_type':8, 'total_team':3, 'result1':[1,2], 'result2':[1], 'result3':[], 'reward':'reward', 'state':2}
		response = client.put('/api/tournament', json.dumps(tournament_json), content_type='application/json')
		self.assertEqual(response.status_code, 200)
		response = client.get('/api/tournament/1')
		self.assertIn('reward', response.content.decode())

		response = client.put('/api/tournament/4')
		self.assertEqual(response.status_code, 405)

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


