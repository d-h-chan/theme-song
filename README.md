## Api Endpoints:
GET /api/database/songs - return list of all songs in the db, or all songs that match query parameters (e.g. http://localhost:8000/api/database/songs?q=worthy)

POST /api/database/songs - insert a list of new songs into the db

GET /api/database/artists - return list of all artists in db

GET /api/genius/search - return a list of songs from genius that match the search parameters (uses genius endpoint https://api.genius.com/search?q={parameters})

GET /api/genius/search/:artist_id - returns a list of 30 most popular songs by an artist from genius (uses genius endpoint  https://api.genius.com/artists/${artist_id}/songs?sort=popularity&per_page=30)

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
