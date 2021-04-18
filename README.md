# Pypestream Test Task
## Description

Let’s build a small email app that lets users subscribe to receive Broadcast emails
about specific Topics. Our goal is to have this be completable in ​4-6 hours at most, so
please give feedback ​on how you felt about the project, requirements, specifications,
etc.

## Installation
Create a .env file inside server folder and paste following content
```
PORT=8000
NODE_ENV=local
MONGO_URI=mongodb://localhost/test
```

Install node modules

```bash
$ cd server
$ npm install
$ cd client
$ npm install
```

## Running the app

```bash
# start the server first
$ cd server
$ npm run start:dev

# start front end
$ cd client
$ npm start
```