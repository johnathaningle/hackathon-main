import os, glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

os.chdir('dashboard-ui/dist')
js_counter = 0
css_counter = 0
for root, dirs, files in os.walk("."):
    for f in files:
        if f.endswith('.js'):
            print(os.path.join(root, f))