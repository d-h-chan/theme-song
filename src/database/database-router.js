const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const JSSoup = require('jssoup').default
const DatabaseService = require('./database-service')

const databaseRouter = express.Router()
const jsonParser = express.json()


function getSongFromResult(result) {
  return {
    title: result.title,
    artist_id: result.artistId,
    song_url: result.url,
    themes: result.themes,
    genius_id: result.geniusId,
  };
}

function getArtistFromResult(result) {
  return {
    genius_id: result.artistId,
    artist_name: result.artist
  };
}
function processLyrics(input) {
  input = input.toLowerCase().replace(/(\r\n|\n|\r|,)/gm, " ");
  let inputArr = input.split(' ');
  let newSet = new Set(inputArr);
  let output = "";
  for (let item of newSet) {
    output = output.concat(item, " ");
  }
  return output;
}

function getLyrics(url) {
  return fetch(url)
    .then(_res => {
      return (_res.text());
    })
    .then(html => {
      let soup = new JSSoup(html);
      let found = soup.find("div", "lyrics").getText();
      let lyrics = processLyrics(found);
      return lyrics;
    })
}

databaseRouter
  .route('/songs')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    let inputStr = req.query.q;
    if (inputStr === null || inputStr.match(/^ *$/) !== null) {
      DatabaseService.getAllSongs(knexInstance)
      .then(songs => {
        res.json(songs.map(DatabaseService.serializeSong));
      })
      .catch(next);
    }
    else {
    DatabaseService.getSongs(knexInstance, req.query.q)
      .then(songs => {
        res.json(songs.map(DatabaseService.serializeSong));
      })
      .catch(next);
    }
  })
  .post(jsonParser, (req, res) => {
    let results = req.body;
    const knexInstance = req.app.get('db');
    for (const result of results) {
      const artist = getArtistFromResult(result);
      DatabaseService.insertArtist(knexInstance, artist)
      .then(r => {
        return getLyrics(result.url);
      })
      .then(lyrics => {
        const song = getSongFromResult(result);
        song.lyrics = lyrics;
        DatabaseService.insertSong(knexInstance, song);
      })
    }
    res
    .status(201)
    .send(results)
  })

databaseRouter
  .route('/artists')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    DatabaseService.getArtists(knexInstance)
      .then(artists => {
        res.json(artists.map(DatabaseService.serializeArtist));
      })
      .catch(next);
  })

module.exports = databaseRouter