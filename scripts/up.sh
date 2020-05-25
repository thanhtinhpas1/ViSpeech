#!/bin/sh

export DIR_DATA_PATH="$PWD"

export CONTAINER_COMMAND="npm build && npm start:prod"
export CONTAINER_SCALE="1"
export CONTAINER_PORT="7070"
# release app and vispeechdemo
export CONTAINER_NODE_COMMAND="npm start"
export VISPEECH_PORT_DEMO=5000
export VISPEECH_PORT=7070
export RELEASE_INTERNAL_PORT=8000
export RELEASE_PAGE_PORT=80
export SENDGRID_API_KEY='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'
export STRIPE_SECRET_KEY='sk_test_U1j7h9gyeVW2EP4bWwPlunzW00zQinDEbi'

#  docker-compose rm --all &&
#  docker-compose pull &&
#  docker-compose build &&
#  docker-compose up --force-recreate
docker-compose up --build