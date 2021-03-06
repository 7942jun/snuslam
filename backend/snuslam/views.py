from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from .models import Profile, Room, Team, Tournament
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, csrf_protect
from django.shortcuts import render
from elo import rate_1vs1
import json

@ensure_csrf_cookie
def token(request):
	if request.method == 'GET':
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def user(request):
	if request.method == 'GET':
		user_list = [profile.json() for profile in Profile.objects.all()]
		return HttpResponse(json.dumps(user_list), content_type='application/json')
	elif request.method == 'POST':
		data = json.loads(request.body.decode())
		email = data['email']
		if User.objects.filter(email=email):
			return HttpResponse(status=407)
		password = data['password']
		username = data['username']
		user = User(email=email, username=username)
		user.set_password(password)
		user.is_active = True
		user.save()
		position = data['position']
		user.profile.position = position
		user.profile.save()		
		return HttpResponse(json.dumps(user.profile.json()), content_type='application/json', status=201)
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])


@csrf_exempt
def user_detail(request, id):
	if request.method == 'GET':
		try:
			profile = Profile.objects.get(id=id)
		except Profile.DoesNotExist:
			return HttpResponse(status=404)
		return HttpResponse(json.dumps(profile.json()), content_type='application/json')
	elif request.method == 'PUT':
		try:
			user = Profile.objects.get(id=id)
		except Profile.DoesNotExist:
			return HttpResponse(status=404)
		data = json.loads(request.body.decode())		
		#user.profile.wins += data['win']
		#user.profile.loses += data['lose']
		user.team = data['team']
		user.save()
		return HttpResponse(status=200)
	elif request.method == 'DELETE':
		try:
			user = User.objects.get(id=id)
		except User.DoesNotExist:
			return HttpResponse(status=404)
		user.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

@csrf_exempt
def user_wins(request, id):
	if request.method == 'PUT':
		try: 
			user = Profile.objects.get(id=id)
		except Profile.DoesNotExist:
			return HttpResponse(status=404)
		data = json.loads(request.body.decode())
		user.wins = user.wins + data['win']
		user.loses = user.loses + data['lose']
		mypoint = data['mypoint']
		yourpoint = data['yourpoint']
		if( data['win'] == 1):
			user.point = user.point + (rate_1vs1(mypoint,yourpoint)[0]-mypoint)
		else:
			user.point = user.point + (rate_1vs1(yourpoint,mypoint)[1]-mypoint)
		user.save()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['PUT'])

def user_room(request, id):
	if request.method == 'GET':
		try:
			profile = Profile.objects.get(id=id)
		except Profile.DoesNotExist:
			return HttpResponse(status=404)
		
		guests_list = [room.json() for room in profile.user.room_guests.all()]
		host_list = [room.json() for room in profile.user.room_host.all()]
		rooms = guests_list + host_list 
		return HttpResponse(json.dumps(rooms), content_type='application/json')
	else:
		return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def rank(request):
	if request.method == 'GET':
		rank_list = [profile.json() for profile in Profile.objects.all()]
		return HttpResponse(json.dumps(rank_list), content_type='application/json')
	else:
		return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def sign_in(request):
	if request.method == 'POST':
		data = json.loads(request.body.decode())
		email = data['email']
		password = data['password']
		try:
			username = User.objects.get(email=email).username
		except User.DoesNotExist:
			return HttpResponse(status=401)
		user = authenticate(username=username, password=password)
		if user is not None:
			login(request, user)
			return HttpResponse(json.dumps(user.profile.json()), content_type='application/json', status=200)
		else:
			return HttpResponse(status=401)
	else:
		return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def sign_out(request):
	if request.method == 'GET':
		logout(request)
		return HttpResponse(status=204)
	else:
		return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def room(request):
	if request.method == 'GET':
		room_list = [room.json() for room in Room.objects.all()]
		return HttpResponse(json.dumps(room_list), content_type='application/json')
	elif request.method == 'POST':
		data = json.loads(request.body.decode())
		title = data['title']
		location = data['location']
		play_time = data['play_time']
		type = data['type']
		host = User.objects.get(id=data['host'])
		room = Room(title=title, host=host, location=location, play_time=play_time, type=type)
		room.save()
		response_dict = {'id':room.id}
		return HttpResponse(json.dumps(response_dict), content_type='application/json', status=201)
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def room_detail(request, id):
	if request.method == 'GET':
		try:
			room = Room.objects.get(id=id)
		except Room.DoesNotExist:
			return HttpResponse(status=404)
		return HttpResponse(json.dumps(room.json()), content_type='application/json')
	elif request.method == 'PUT':
		try:
			room = Room.objects.get(id=id)
		except Room.DoesNotExist:
			return HttpResponse(status=404)
		data = json.loads(request.body.decode())
		room.title = data['title']
		room.location = data['location']
		room.play_time = data['play_time']
		room.type = data['type']
		room.host = User.objects.get(id=data['host'])
		room.ingame = data['ingame']
		for user in room.guests.all():
			room.guests.remove(user)
		for id in data['guests']:
			room.guests.add(User.objects.get(id=id))
		room.save()
		return HttpResponse(status=200)
	elif request.method == 'DELETE':
		try:
			room = Room.objects.get(id=id)
		except Room.DoesNotExist:
			return HttpResponse(status=404)
		room.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])


@csrf_exempt
def room_user(request, id):
	if request.method == 'GET':
		user_list = [Profile.objects.get(id=user.id).json() for user in Room.objects.get(id=id).guests.all()]
		host_profile = Profile.objects.get(id=Room.objects.get(id=id).host.id)
		user_list.insert(0, host_profile.json())
		return HttpResponse(json.dumps(user_list), content_type='application/json')
	elif request.method == 'PUT':
		room = Room.objects.get(id=id)
		data = json.loads(request.body.decode())
		new_user = User.objects.get(id=data['user'])
		if room.host.id == new_user.id:
			return HttpResponse(status=204)
		for temp in room.guests.all():
			if temp.id == new_user.id:
				return HttpResponse(status=409)
		room.guests.add(new_user)
		room.save()
		return HttpResponse(status=200)
	elif request.method == 'DELETE':
		room = Room.objects.get(id=id)
		data = json.loads(request.body.decode())
		user = User.objects.get(id=data['user'])
		room.guests.remove(user)
		room.save()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

@csrf_exempt
def room_user_detail(request, id, user_id):
	if request.method == 'DELETE':
		room = Room.objects.get(id=id)
		user = User.objects.get(id=user_id)
		room.guests.remove(user)
		room.save()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['DELETE'])


@csrf_exempt
def tournament(request):
	if request.method == 'GET':
		tournament_list = [tournament.json() for tournament in Tournament.objects.all()]
		return HttpResponse(json.dumps(tournament_list), content_type='appication/json')
	elif request.method == 'POST':
		data = json.loads(request.body.decode())
		title = data['title']
		game_type = data['game_type']
		total_team = data['total_team']
		host = data['host']
		reward = data['reward']
		tournament = Tournament(title=title, host=host, game_type=game_type, total_team=total_team, reward=reward)
		tournament.save()
		return HttpResponse(status=201)
	elif request.method == 'PUT':
		data=json.loads(request.body.decode())
		try:
			tournament = Tournament.objects.get(id=data['id'])
		except Tournament.DoesNotExist:
			return HttpResponse(status=404)
		tournament.title = data['title']
		tournament.host = data['host']
		for team in tournament.teams.all():
			tournament.teams.remove(team)
		for id in data['teams']:
			tournament.teams.add(Team.objects.get(id=id))
		tournament.game_type = data['game_type']
		tournament.total_team = data['total_team']
		tournament.reward = data['reward']
		tournament.state = data['state']
		tournament.result11 = data['result11']
		tournament.result12 = data['result12']
		tournament.result13 = data['result13']
		tournament.result14 = data['result14']
		tournament.result21 = data['result21']
		tournament.result22 = data['result22']
		tournament.result31 = data['result31']
		for user in tournament.teamLeaders.all():
			tournament.teamLeaders.remove(user)
		for id in data['teamLeaders']:
			tournament.teamLeaders.add(User.objects.get(id=id))

		tournament.save()
		return HttpResponse(status=200)

	else:
		return HttpResponseNotAllowed(['GET', 'POST', 'PUT'])

@csrf_exempt
def tournament_detail(request, id):
	if request.method == 'GET':
		try:
			tournament = Tournament.objects.get(id=id)
		except Tournament.DoesNotExist:
			return HttpResponse(status=404)
		return HttpResponse(json.dumps(tournament.json()), content_type='application/json')
	elif request.method == 'DELETE':
		try:
			tournament = Tournament.objects.get(id=id)
		except Tournament.DoesNotExist:
			return HttpResponse(status=404)
		tournament.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET', 'DELETE'])

@csrf_exempt
def team(request):
	if request.method == 'GET':
		team_list = [team.json() for team in Team.objects.all()]
		return HttpResponse(json.dumps(team_list), content_type='appication/json')
	elif request.method == 'POST':
		data = json.loads(request.body.decode())
		leader_id = User.objects.get(id=data['leader_id'])
		name = data['name']
		leaderName = data['leaderName']
		contact = data['contact']
		team = Team(leader_id=leader_id, name=name, leaderName=leaderName, contact=contact)
		team.save()
		response_dict = team.json()
		return HttpResponse(json.dumps(response_dict), content_type = 'application/json', status=201)
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def team_detail(request, id):
	if request.method == 'GET':
		try:
			team = Team.objects.get(id=id)
		except Team.DoesNotExist:
			return HttpResponse(status=404)
		return HttpResponse(json.dumps(team.json()), content_type='application/json')
	elif request.method == 'PUT':
		try:
			team = Team.objects.get(id=id)
		except Team.DoesNotExist:
			return HttpResponse(status=404)
		data=json.loads(request.body.decode())
		user = User.objects.get(id=data['user'])
		team.members_id.add(user)
		team.save()
		return HttpResponse(status=200)
	elif request.method == 'DELETE':
		try:
			team = Team.objects.get(id=id)
		except Team.DoesNotExist:
			return HttpResponse(status=404)
		team.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
