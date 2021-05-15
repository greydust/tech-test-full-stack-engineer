Your Solution Documentation
===========================

# Docker

The original `docker-compose.yml` did not include `node_modules` related build command and would fail to run the instance.  
There are two approaches to fix it:
  1. Make a bash script and run `npm install` before running docker-compose.
  2. Write a new Dockerfile and define related `npm install` instructions to build the image.

I chose the second approach since it aligns with the idea of "container" and keeps the environment consistent.

# Frontend

# Backend

## Framework

Express was the only one that I had tried before and it seems to fit the requirement of the project, so I kept express.

## API

By looking at the description of the task, it has four operations:
  1. List jobs in the `Invited` tab.
  2. List jobs in the `Accepted` tab.
  3. Accept a job.
  4. Decline a job.

Following the philosophy of REST API, we have only one resource: job. So the four operations translate to the following:
  1. GET /job?status=new
  2. GET /job?status=accepted
  3. POST /job/:id
      - POST body: { "operation": "accept" }
  4. POST /job/:id
      - POST body: { "operation": "decline" }

Corresponding functions are declared with names instead of lambda functions to do unit tests properly.

## Linting

Migrate to ESLint, which should be officially supported and chose a config that I am more familiar with.

## Testing

mocha(Framework) + chai(Assertion) + rewire(Exposure). Just something I am familiar with that would get the job done.