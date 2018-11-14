from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from .models import Profile, Room, Team, Tournament
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json

def chat(request):
	context={}
	return render(request, 'room.html', context)


@csrf_exempt
def user(request):
	if request.method == 'GET':
		user_list = [profile.json() for profile in Profile.objects.all()]
		return HttpResponse(json.dumps(user_list), content_type='appication/json')
	elif request.method == 'POST':
		#todo: 중복 체크 구현
		data = json.loads(request.body.decode())
		email = data['email']
		password = data['password']
		username = data['username']
		user = User(email=email, password=password, username=username)
		user.save()
		position = data['position']
		user.profile.position = position
		user.profile.save()		
		return HttpResponse(status=201)
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
			user = User.objects.get(id=id)
		except User.DoesNotExist:
			return HttpResponse(status=404)
		data = json.loads(request.body.decode())		
		user.profile.wins += data['win']
		user.profile.loses += data['lose']
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

def rank(requeset):
	if request.method == 'GET':
		#todo: rank 구현하기
		pass
	else:
		return HttpResponse(status=405)

def sign_in(request):
	if request.method == 'POST':
		data = json.loads(request.body.decode())
		email = data['email']
		password = data['password']
		try:
			temp = User.objects.get(email=email)
		except User.DoesNotExist:
			return HttpResponse(status=401)
		username = temp.username
		user = authenticate(username=username, password=password)
		if user is not None:
			login(request, user)
			return HttpResponse(status=204)
		else:
			return HttpResponse(status=401)
	else:
		return HttpResponseNotAllowed(['POST'])

def sign_out(request):
	if request.method == 'GET':
		if request.user.is_authenticated:
			logout(request)
			return HttpResponse(status=204)
		else:
			return HttpResponse(status=401)
	else:
		return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def room(request):
	if request.method == 'GET':
		room_list = [room.json() for room in Room.objects.all()]
		return HttpResponse(json.dumps(room_list), content_type='appication/json')
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
		user = User.objects.get(id=data['user'])
		room.guests.add(user)
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

def tournament(request):
	if request.method == 'GET':
		tournament_list = [tournament.json() for tournament in Tournament.objects.all()]
		return HttpResponse(json.dumps(tournament_list), content_type='appication/json')
	elif request.method == 'POST':
		data = json.loads(request.body.decode())
		title = data['title']
		type = data['type']
		host = User.objects.get(id=data['host'])
		reward = data['reward']
		tournament = Tournament(title=title, host=host, type=type, reward=reward)
		tournament.save()
		return HttpResponse(status=201)
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])


def tournament_detail(request, id):
	if request.method == 'GET':
		try:
			tournament = Tournament.objects.get(id=id)
		except Tournament.DoesNotExist:
			return HttpResponse(status=404)
		return HttpResponse(json.dumps(tournament.json()), content_type='application/json')
	elif request.method == 'PUT':
		try:
			tournament = Tournament.objects.get(id=id)
		except Tournament.DoesNotExist:
			return HttpResponse(status=404)
		data=json.loads(request.body.decode())
		team = Team.objects.get(id=data['team'])
		tournament.teams.add(team)
		tournament.save()
		return HttpResponse(status=200)
	elif request.method == 'DELETE':
		try:
			tournament = Tournament.objects.get(id=id)
		except Tournament.DoesNotExist:
			return HttpResponse(status=404)
		tournament.delete()
		return HttpResponse(status=200)
	else:
		return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def team(request):
	if request.method == 'GET':
		team_list = [team.json() for team in Team.objects.all()]
		return HttpResponse(json.dumps(team_list), content_type='appication/json')
	elif request.method == 'POST':
		data = json.loads(request.body.decode())
		leader = User.objects.get(id=data['leader'])
		name = data['name']
		team = Team(leader=leader, name=name)
		team.save()
		return HttpResponse(status=201)
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])

	pass

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
		team.members.add(user)
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

