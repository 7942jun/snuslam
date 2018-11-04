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
	pass

def tournament_create(request):
	pass

def tournament_participate(request, id):
	pass

def tournament_ongoing(request, id):
	pass

def team(request):
	pass

def team_participate(request, id):
	pass
