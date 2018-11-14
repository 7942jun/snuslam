from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	teams_id = models.ManyToManyField(User, related_name='%(class)s_teams')
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
			'teams': [user.id for user in self.teams_id.all()],
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
	leader = models.ForeignKey(User, on_delete=models.CASCADE)
	members = models.ManyToManyField(User, related_name='%(class)s_users')
	name = models.CharField(max_length=20)

	def json(self):
		return {
			'id': self.id,
			'name': self.name,
			'leader': self.leader.id,
			'members': [user.id for user in self.members.all()]
		}

class Room(models.Model):
	title = models.CharField(max_length=20)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
	guests = models.ManyToManyField(User, related_name='%(class)s_users')
	location = models.CharField(max_length=100)
	play_time = models.IntegerField(default=0)
	type = models.IntegerField(default=0)

	def json(self):
		return {
			'id': self.id,
			'title': self.title,
			'location': self.location,
			'play_time': self.play_time,
			'type': self.type,
			'host': self.host.id,
			'guests': [user.id for user in self.guests.all()],
		}

class Tournament(models.Model):
	title = models.CharField(max_length=100)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
	teams = models.ManyToManyField(Team, related_name='%(class)s_teams')
	type = models.IntegerField(default=0)
	reward = models.CharField(max_length=100)

	def json(self):
		return {
			'id': self.id,
			'title': self.title,
			'host': self.host.id,
			'teams': [team.id for team in self.teams.all()],
			'type': self.type,
			'reward': self.reward
		}
