from django.db import models
from user import models as user_models
# Create your models here.
class Type(models.Model):
    connection_type = models.CharField(max_length=80)
    def __str__(self):
        return self.connection_type

class Connection(models.Model):
    name = models.CharField(max_length=80)
    type_id = models.ForeignKey(Type, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return f"{self.name}"

class ProfileConnection(models.Model):
    profile = models.ForeignKey(user_models.Profile, on_delete=models.CASCADE)
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE)