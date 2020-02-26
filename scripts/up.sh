#!/bin/sh

export DIR_DATA_PATH="$PWD"

export CONTAINER_COMMAND="yarn start:dev"
export CONTAINER_SCALE="1"
export CONTAINER_PORT="7070"

# remove cache volume cause mysql communication failed with root user
# docker-compose rm -fv
docker-compose up -d --build

#vispeech app
export VISPEECH_PORT=7070

# release app and vispeechdemo
export CONTAINER_NODE_COMMAND="yarn start"
export VISPEECH_PORT_DEMO=3000
export RELEASE_PAGE_PORT=80
