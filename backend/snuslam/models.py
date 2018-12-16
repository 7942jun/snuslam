from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	position = models.CharField(max_length=100)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	point = models.IntegerField(default=0)
	team = models.IntegerField(default=0)

	def json(self):
		return {
			'id': self.id,
			'email': self.user.email,
			'password': self.user.password,
			'username': self.user.username,
			'position': self.position,
			'wins': self.wins,
			'loses': self.loses,
			'point': self.point,
			'team': self.team
		}
	
	#User의 save()가 호출됐을 때 Profile 자동으로 생성 및 연결
	@receiver(post_save, sender=User)
	def create_user_info(sender, instance, created, **kwargs):
		if created:
			Profile.objects.create(user=instance)

	#User의 save()가 호출됐을 때 Profile 자동으로 저장
	@receiver(post_save, sender=User)
	def save_user_info(sender, instance, **kwargs):
		instance.profile.save()

class Team(models.Model):
	leader_id = models.ForeignKey(User, on_delete=models.CASCADE)
	members_id = models.ManyToManyField(User, related_name='%(class)s_users')
	name = models.CharField(max_length=20)

	def json(self):
		return {
			'id': self.id,
			'name': self.name,
			'leader_id': self.leader_id.id,
			'members_id': [user.id for user in self.members_id.all()]
		}

class Room(models.Model):
	title = models.CharField(max_length=20)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_host')
	guests = models.ManyToManyField(User, related_name='%(class)s_guests')
	location = models.CharField(max_length=100)
	play_time = models.IntegerField(default=0)
	type = models.IntegerField(default=0)
	ingame = models.BooleanField(default=False)

	def json(self):
		return {
			'id': self.id,
			'title': self.title,
			'location': self.location,
			'play_time': self.play_time,
			'type': self.type,
			'host': self.host.id,
			'ingame': self.ingame,
			'guests': [user.id for user in self.guests.all()],
		}

class Tournament(models.Model):
	title = models.CharField(max_length=100)
	host = models.IntegerField(default=0)
	teams = models.ManyToManyField(Team, related_name='%(class)s_teams')
	game_type = models.IntegerField(default=0)
	total_team = models.IntegerField(default=0)
	result1 = models.ManyToManyField(Team, related_name='%(class)s_result1')
	result2 = models.ManyToManyField(Team, related_name='%(class)s_result2')
	result3 = models.ManyToManyField(Team, related_name='%(class)s_result3')
	state = models.IntegerField(default=1)
	reward = models.CharField(max_length=100)

	def json(self):
		return {
			'id': self.id,
			'title': self.title,
			'host': self.host,
			'teams': [team.id for team in self.teams.all()],
			'result1': [team.id for team in self.result1.all()],
			'result2': [team.id for team in self.result2.all()],
			'result3': [team.id for team in self.result3.all()],
			'total_team': self.total_team,
			'game_type': self.game_type,
			'state': self.state,
			'reward': self.reward
		}
