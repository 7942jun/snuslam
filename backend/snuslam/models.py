from django.db import models

class User(models.Model):
	email = models.CharField(max_length=100)
	password = models.CharField(max_length=20)
	nickname = models.CharField(max_length=10)
	position = models.CharField(max_length=100)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	point = models.IntegerField(default=0)

	def increaseWins(self):
		pass

	def increaseLoses(self):
		pass

class Team(models.Model):
	leader = models.ForeignKey(User, on_delete=models.CASCADE)
	members = models.ManyToManyField(User, related_name='%(class)s_users')
	name = models.CharField(max_length=20)

class Room(models.Model):
	title = models.CharField(max_length=20)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
	guests = models.ManyToManyField(User, related_name='%(class)s_users')
	location = models.CharField(max_length=100)
	play_time = models.IntegerField(default=0)
	creation_time = models.DateTimeField(auto_now_add=True)
	type = models.IntegerField(default=0)

	def getDate(self):
		pass

class Tournament(models.Model):
	title = models.CharField(max_length=100)
	host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_user')
	teams = models.ManyToManyField(Team, related_name='%(class)s_teams')
	type = models.IntegerField(default=0)
	max_team = models.IntegerField(default=0)
	result = models.ManyToManyField(Team, related_name='%(class)s_result_teams')
	reward = models.CharField(max_length=100)
	admin_approval = models.BooleanField(default=False)

	def updateResult():
		pass
