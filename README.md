# django-react-template [WIP]

A template for a Django project with a React frontend. Supports the following:
1. Django backend (along with Django REST Framework)
2. React with TypeScript support
3. My preferred styling setup
4. Necessary scaffolding for elastic beanstalk deployment

## Getting Started

1. Clone the repo with `git clone https://github.com/prashanthselvam/django-react-template` and cd into the directory.
2. Create a new virtualenv using `virtualenv venv` and activate it with `source venv/bin/activate`
3. Install the dependencies with `pip install -r requirements.txt`
4. Create `.env` file from the `dot-env` template with `cp dot-env .env`
5. Run `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())’` to generate a dango secret key
6. Paste the generated key into the `SECRET_KEY` field in `.env`
7. Run `npm i` to install the frontend dependencies

After these steps, you should have an app that is fully ready to go. 

You can now run the following in 3 different terminal tabs:
 - `./manage.py runserver`
 - `npm run start:dev`
 - `npm run tailwind:dev`

## ElasticBeanstalk

This project is built to be deployed on AWS ElasticBeanstalk. To do so,
do the following:

1. Run `npm run build` and `npm run tailwind:dev` once to get the static
files generated in the dist folder. Then run `./manage.py collectstatic` to
get those into django's static directory.
2. It's usually a good idea to create a new AWS account for each app you 
build. So get that stuff set up first and once you have the profile setup
for your AWS CLI, you're ready to go. 
3. Run `eb init` and initialize the EB project 
4. Run `eb create <project_name>-env`. This will set up the env in EB. (Note:
this will set up the env but with errors because the `migrate` step in django.config
will fail since there's no DB yet)
5. Set up a postgres DB for the project by first opening the eb console 
with `eb console`, going to `configuration`, scrolling to `database` and
hitting edit. 
6. You also need to put in any env variables that are in the `.env` file
in the eb environment. You can do this by clicking `edit` on the Software
option. 
7. Run `eb status` to find the cname of the new environment. You will need
to add this into the INSTALLED_APPS setting in `settings.py`. 
8. Commit the latest changes and then run `eb deploy`.

## NOTE
This app currently runs with DEBUG set to True. This is fine for dev but
not fine for production. Right now setting this to False and deploying
causes static files to not load. Not totally sure the cause here but will
need to fix once I figure it out.

## Project Structure

The Django project comes with a single app already created called `main`. 
There is a single React App that gets mounted in main's template file. The
idea is that this app will provide the full frontend experience. This approach
lets you have fully decoupled frontend & backend.

Our webpack config is configured to compile the tsx files and drop them into the `dist` 
directory. We also use a `publicPath` in the webpack config which is the URL at which django
finds the compiled files.

There's also a `static` directory
within the frontend directory where all other static assets can go (css,
images, etc.)
