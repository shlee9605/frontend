#!/bin/bash
DOCKER_USER_NAME=wolfandcamel
DOCKER_IMAGE_NAME=frontend
DOCKER_IMAGE_TAG=1.3

docker build -t $DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG .
