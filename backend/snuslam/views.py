from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
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
		room_list = [room for room in Room.objects.all().values()]
		return JsonResponse(room_list, safe=False)
	else:
		return HttpResponseNotAllowed(['GET'])

def room_create(request):
	if request.method == 'POST':
		data = json.loads(request.body.decode())
		title = data['title']
		location = data['location']
		play_time = data['play_time']
		type = data['type']
		host = request.user
		room = Room(title=title, host=host, location=location, play_time=play_time, type=type)
		room.save()
		response_dict = {
			'id' = room.id,
			'title' = room.title,
			'host' = room.host,
			'location' = room.location,
			'play_time' = room.play_time,
			'cration_time' = room.creation_time,
			'type' = room.type
		}
		return JsonResponse(response_dict, status=201)
	else:
		return HttpResponseNotAllowed(['POST'])



def room_detail(request, id)
	if request.method == 'GET':
		try:
			room = Room.objects.get(id=id)
		except Room.DoesNotExist:
			return HttpResponse(status=404)
		room = model_to_dict(room)
		return JsonResponse(room, safe=False)
	elif request.method == 'PUT':
		try:
			room = Room.objects.get(id=id)
		except Room.DoesNotExist:
			return HttpResponse(status=404)
		new_user = json.loads(request.body.decode())
		room.guests.add(new_user)
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
		return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE')]

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
