from django.contrib import admin
from .models import Profile
from .models import Team
from .models import Room
from .models import Tournament

admin.site.register(Profile)
admin.site.register(Team)
admin.site.register(Room)
admin.site.register(Tournament)