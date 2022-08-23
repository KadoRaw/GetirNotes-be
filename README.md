# GetirNotes

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Table of Content:

- [About The Api](#about-the-api)

- [Technologies](#technologies)

- [Setup](#setup)

# About

The API

GetirNotes is an api that a note-taking.

# Technologies

- I used `express.js` for backend process.
- I used `mongoose` for Database management and connections.
- I used `heroku` for deployment the API.
- I used `swagger` for easy-use.

# Setup

- Download or clone the repository

- run `yarn` & `npm install`. I prefer `yarn`.

- run `yarn start` & `npm start`

- Don't forget set your db settings on local - [Database Setup](#database-setup)

## DataBase Setup

- Create `nodemon.json` file and set the `env` object which must contain `DB_USER` and `DB_PASSWORD`
- Done :)

# Routes

## Notes

`/docs` Swagger opens. **SWAGGER**

Main routes is `/api/notes/`.

- `/api/notes/:noteId` Getting `noteId` and delete from DataBase. **DELETE**
- `/api/notes/:noteId` Getting `noteId` and return single note. **GET**
- `/api/notes/` Returns all notes from Database. **GET**
- `/api/notes/:noteId` Getting `nodeId` and note objects then It update the note
  and return the new Note **PATCH**
- `/api/notes/` Getting note objects and create note and return the Created
  Objects from Database **POST**
