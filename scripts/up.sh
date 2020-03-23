#!/bin/sh

export DIR_DATA_PATH="$PWD"

export CONTAINER_COMMAND="npm build && npm start:prod"
export CONTAINER_SCALE="1"
export CONTAINER_PORT="7070"
# release app and vispeechdemo
export CONTAINER_NODE_COMMAND="npm start"
export VISPEECH_PORT_DEMO=3000
export VISPEECH_PORT=7070
export RELEASE_INTERNAL_PORT=8000
export RELEASE_PAGE_PORT=80

#  docker-compose rm --all &&
#  docker-compose pull &&
#  docker-compose build &&
#  docker-compose up --force-recreate
docker-compose up --build