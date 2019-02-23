
import csv
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.`settings`")
headings = []
people = []
username_list = []
with open("Book2.csv") as data:
    counter = 0
    for row in csv.reader(data, delimiter=','):
        if counter == 0:
            for col in row:
                headings.append(col)
        else:
            col_index = 0
            person_name = ""
            person = {}
            person_connections = []
            for col in row:
                if col_index == 0:
                    person_name = col
                    username_list.append(person_name)
                else:
                    if col == "N/A" or col[0] == ".":
                        pass
                    else:
                        connection = {}
                        connection[headings[col_index]] = col
                        print(connection)
                        person_connections.append(connection)
                col_index += 1
            person[person_name] = person_connections
            people.append(person)
        person_connections = []
        col_index = 0  
        counter += 1



print(type(people))
print(people)

# for username in username_list:
#     user = User.objects.create_user(username, password="password")
#     user.is_superuser = False
#     user.is_staff = False
#     user.save()




