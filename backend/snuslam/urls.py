from django.urls import path
from . import views

urlpatterns = [
	path('chat', views.chat, name='chat'),
	path('user', views.user, name='user'),
	path('user/<int:id>', views.user_detail, name='user_detail'),
	path('user/rank', views.rank, name='user_rank'),
	path('sign_in', views.sign_in, name='sign_in'),
	path('sign_out', views.sign_out, name='sign_out'),
	path('user/rank', views.rank, name='rank'),
	path('room', views.room, name='room'),
	path('room/<int:id>', views.room_detail, name='room_detail'),
	path('room/<int:id>/user', views.room_user, name='room_user'),
	path('tournament', views.tournament, name='tournament'),
	path('tournament/<int:id>', views.tournament_detail, name='tournament_detail'),
	path('team', views.team, name='team'),
	path('team/<int:id>', views.team_detail, name='team_detail')
]
