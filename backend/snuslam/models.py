from django.db import models

class User(models.Model):
	email = models.CharField(max_length=100)
	password = models.CharField(max_length=20)
	nickname = models.CharField(max_length=10)
	position = models.CharField(max_length=100)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	point = models.IntegerField(default=0)

	def json(self):
		return {
			'email': self.email,
			'password': self.password,
			'nickname': self.nickname,
			'position': self.position,
			'wins': self.wins,
			'loses': self.loses,
			'point': self.point
		}

class Team(models.Model):
	leader = models.ForeignKey(User, on_delete=models.CASCADE)
	members = models.ManyToManyField(User, related_name='%(class)s_users')
	name = models.CharField(max_length=20)

	def json(self):
		return {
			'name': self.name,
			'leader': self.leader.id,
			'member': [user.id for user in self.member.all()]
		}

class Room(models.Model):
	title = models.CharField(max_length=20)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
	guests = models.ManyToManyField(User, related_name='%(class)s_users')
	location = models.CharField(max_length=100)
	play_time = models.IntegerField(default=0)
	creation_time = models.DateTimeField(auto_now_add=True)
	type = models.IntegerField(default=0)

	def getDate(self):
		return self.creation_time

	def json(self):
		return {
			'title': self.title,
			'location': self.location,
			'play_time': self.play_time,
			'type': self.type,
			'host': self.host.id,
			'guests': [user.id for user in self.guests.all()],
			'creation_time': str(self.creation_time)
		}

class Tournament(models.Model):
	title = models.CharField(max_length=100)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
	teams = models.ManyToManyField(Team, related_name='%(class)s_teams')
	type = models.IntegerField(default=0)
	result = models.ManyToManyField(Team, related_name='%(class)s_result_teams')
	reward = models.CharField(max_length=100)
	admin_approval = models.BooleanField(default=False)

	def json(self):
		return {
			'title': self.title,
			'host': self.host.id,
			'teams': [team.id for team in self.teams.all()],
			'type': self.type,
			'result': [team.id for team in self.result.all()],
			'reward': self.reward,
			'admin_approval': self.admin_approval
		}
