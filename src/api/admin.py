from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Connection)
admin.site.register(models.Type)
admin.site.register(models.ProfileConnection)
admin.site.register(models.Friend)
admin.site.register(models.Box)