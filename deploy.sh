#!/bin/bash
docker build . -t nodejs-rest
heroku container:push web --app celtra-slackbot
heroku container:release web --app celtra-slackbot