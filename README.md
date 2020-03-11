# Theme Song

## Summary:
Theme-Song is an application that will let the user search for songs by their lyric or theme, created for use by the worship leaders at River of Life Church. Lyrics are sourced via the Genius Lyrics API, and users songs are saved into a postgres db

## Link to Live Project
https://theme-song-app.now.sh/

## Screenshots:
![Info Screen](https://user-images.githubusercontent.com/55512143/76169301-0ba86380-6134-11ea-988b-266d005fb0aa.png)
![Game Screen](https://user-images.githubusercontent.com/55512143/76169304-0d722700-6134-11ea-9509-476cbb3d8025.png)

## Api Endpoint Documentation:
GET /api/database/songs - return list of all songs in the db, or all songs that match query parameters (e.g. http://localhost:8000/api/database/songs?q=worthy)

POST /api/database/songs - insert a list of new songs into the db

GET /api/database/artists - return list of all artists in db

GET /api/genius/search - return a list of songs from genius that match the search parameters (uses genius endpoint https://api.genius.com/search?q={parameters})

GET /api/genius/search/:artist_id - returns a list of 30 most popular songs by an artist from genius (uses genius endpoint  https://api.genius.com/artists/${artist_id}/songs?sort=popularity&per_page=30)

### Technology:
HTML, CSS, Javascript, React, Enzyme, Node, Cors, Dotenv, Express, Helmet, Morgan, Pg, Xss

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
