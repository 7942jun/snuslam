from django.urls import path
from . import views

urlpatterns = [
	path('', views.user, name='user'),
	path('sign_up', views.sign_up, name='sign_up'),
	path('rank', views.rank, name='rank'),
	path('game', views.game, name='rank'),
	path('room', views.room, name='room'),
	path('room/create', views.room_create, name='room_create'),
	path('room/detail/<int:id>', views.room_detail, name='room_detail'),
	path('game/<int:id>', views.game_detail, name='game_detail'),
	path('tournament', views.tournament, name='tournament'),
	path('tournament/<int:id>', views.tournament_detail, name='tournament_detail'),
	path('tournament/participate/<int:id>', views.tournament_participate, name='tournament_participate'),
	path('tournament/ongoing/<int:id>', views.tournament_ongoing, name='tournament_ongoing'),
	path('team', views.team, name='team'),
	path('team/<int:id>', views.team_detail, name='team_detail')
]
