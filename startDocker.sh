#!/bin/bash
app="docker.sdg.front"
docker build -t ${app} .
#sudo docker run -it -p 8080:8080 --rm --name=docker.sdg.front docker.sdg.front
