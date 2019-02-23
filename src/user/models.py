from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    party_tag = models.CharField(max_length=50, default="XXXXXXX")

    def __str__(self):
        return f"{self.user.username} Profile"


    