from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from api.models import ProfileConnection, Connection, Type

# Create your views here.
def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"Account created for {username}")
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'user/register.html', {"form":form})

def login(request):
    return render(request, 'user/login.html')

def account(request):
    user_connections = ProfileConnection.objects.filter(profile__user__username=request.user.username)
    context_data = {}
    user_data = []
    for connection in user_connections:
        c_type = connection.connection.type_id.connection_type
        c_name = connection.connection.name
        if c_type.startswith("Optional"):
            c_type = c_type[8:]
        dataset = f'Your {c_type} include {c_name}'
        user_data.append(dataset)
    context_data["account"] = user_data
    all_connections = Connection.objects.all()
    connection_names = []
    for connection in all_connections:
        connection_names.append(connection.name)
    context_data["dropdown_connections"] = connection_names
    all_types = Type.objects.all()
    types = []
    for t in all_types:
        types.append(t.connection_type)
    context_data["dropdown_types"] = types
    context = {
        "connections":context_data
    }
    return render(request, 'user/account.html', context)

