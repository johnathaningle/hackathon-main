from django.db import models
from user import models as user_models
from django.contrib.auth.models import User

# Create your models here.
class Type(models.Model):
    connection_type = models.CharField(max_length=80)
    connection_color = models.CharField(max_length=20, default="#fff")
    def __str__(self):
        return self.connection_type

class Connection(models.Model):
    name = models.CharField(max_length=80)
    type_id = models.ForeignKey(Type, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return f"{self.name}, {self.type_id}"

class ProfileConnection(models.Model):
    profile = models.ForeignKey(user_models.Profile, on_delete=models.CASCADE)
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.profile.user.username} Connection: {self.connection.name}, {self.connection.type_id}"


class Friend(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    user1 = models.ForeignKey(User, related_name="friendship_creator_set",on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name="friendship_set", on_delete=models.CASCADE)


class Box(models.Model):
    name = models.CharField(max_length=100)
    max_people = models.IntegerField(default=0)
    start_time = models.DateTimeField(auto_now=True, auto_now_add=False)
    end_time = models.DateTimeField(auto_now=True, auto_now_add=False)
    host = models.ForeignKey(User, related_name="box_creator", on_delete=models.CASCADE)
    attendees = models.ManyToManyField(User)
    