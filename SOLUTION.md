Your Solution Documentation
===========================

# Docker

The original `docker-compose.yml` did not include `node_modules` related build command and would fail to run the instance.  
There are two approaches to fix it:
  1. Make a bash script and run `npm install` before running docker-compose.
  2. Write a new Dockerfile and define related `npm install` instructions to build the image.

I chose the second approach since it aligns with the idea of "container" and makes the environment consistent.

# Frontend

# Backend