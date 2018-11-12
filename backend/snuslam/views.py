from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.core import serializers
from .models import User, Room, Team, Tournament
import json

def user(request):
	pass

def sign_up(request):
	pass

def rank(request):
	pass

def game(request):
	pass

def room(request):
	if request.method == 'GET':
		room_list = [room.json() for room in Room.objects.all()]
		return HttpResponse(json.dumps(room_list), content_type='appication/json')
	else:
		return HttpResponseNotAllowed(['GET'])

def room_create(request):
	if request.method == 'POST':
		data = json.loads(request.body.decode())
		title = data['title']
		location = data['location']
		play_time = data['play_time']
		type = data['type']
		host = User(**data['host'])
		room = Room(title=title, host=host, location=location, play_time=play_time, type=type)
		room.save()
		return HttpResponse(status=201)
	else:
		return HttpResponseNotAllowed(['POST'])

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
		user = User(**json.loads(request.body.decode()))
		user.save() #나중에 수정
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

def game_detail(request, id):
	pass

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


def tournament_create(request):
	pass

def tournament_participate(request, id):
	pass

def tournament_ongoing(request, id):
	pass

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

