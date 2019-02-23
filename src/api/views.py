from django.shortcuts import render
from django.http import JsonResponse
from .models import ProfileConnection, Connection, Type
import json
# Create your views here.

def connectionList(request):
    node_list = []
    response_connections = []
    #get current user username
    username = request.user.username
    node_list.append(username)
    #get all their interests
    userProfileConnections = ProfileConnection.objects.filter(profile__user__username=username)
    #get the type and name of each of their interests
    for connect in userProfileConnections:
        c_type = connect.connection.type_id.connection_type
        c_name = connect.connection.name
        #for each of their interests, get all the others who have the same
        relatedConnects = ProfileConnection.objects.filter(connection__name=c_name, connection__type_id__connection_type=c_type)
        for related in relatedConnects:
            relation = []
            relation_attr = {}
            color = related.connection.type_id.connection_color
            relation_attr["color"] = color
            relation_attr["label"] = f"{c_type} and {c_name}"
            #add their usernames to the node list
            r_username = related.profile.user.username
            #if the two nodes
            if r_username != username:
                relation.append(username)
                relation.append(r_username)
                relation.append(relation_attr)
                print(relation)
                if r_username not in node_list:
                    node_list.append(r_username)
                response_connections.append(relation)
        print(node_list)
        print()
        print(response_connections)
    context = {
        "node_list": node_list,
        "connections": response_connections
    }
    # context = json.dumps(context)
    # print(context)
    return JsonResponse(context)
