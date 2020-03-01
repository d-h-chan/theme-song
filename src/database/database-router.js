const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const JSSoup = require('jssoup').default
const xss = require('xss')
const DatabaseService = require('./database-service')

const databaseRouter = express.Router()
const jsonParser = express.json()

const serializeSong = song => ({
  title: song.title,
  artist: song.artist_name,
  url: song.song_url,
  themes: xss(song.themes)
})

function getSongFromResult(result) {
  return {
    title: result.title,
    artist_id: result.artistId,
    song_url: result.url,
    themes: result.themes,
    genius_id: result.geniusId,
  }
}

function getArtistFromResult(result) {
  return {
    genius_id: result.artistId,
    artist_name: result.artist
  };
}

const serializeArtist = artist => ({
  name: artist.artist_name,
  id: artist.genius_id,
})

function processLyrics(input) {
  input = input.toLowerCase().replace(/(\r\n|\n|\r|,)/gm, " ")
  let inputArr = input.split(' ')
  let newSet = new Set(inputArr)
  let output = ""
  for (let item of newSet) {
    output = output.concat(item, " ")
  }
  return output
}

function getLyrics(url) {
  return fetch(url)
    .then(_res => {
      return (_res.text())
    })
    .then(html => {
      let soup = new JSSoup(html);
      let found = soup.find("div", "lyrics").getText()
      let lyrics = processLyrics(found)
      return lyrics
    })
}

databaseRouter
  .route('/songs')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    DatabaseService.getSongs(knexInstance, req.query.q)
      .then(songs => {
        res.json(songs.map(serializeSong))
      })
      .catch(next)
  })
  //
  .post(jsonParser, (req, res, next) => {
    let results = req.body
    const knexInstance = req.app.get('db')
    //res.send(results.map(getArtistFromResults))
    //    Promise.all(DatabaseService.insertArtists(knexInstance, results.map(getArtistFromResults)))
    for (const result of results) {
      const artist = getArtistFromResult(result)
      DatabaseService.insertArtist(knexInstance, artist)
      .then(r => {
        return getLyrics(result.url)
      })
      .then(lyrics => {
        //console.log(lyrics)
        const song = getSongFromResult(result)
        song.lyrics = lyrics
        DatabaseService.insertSong(knexInstance, song)
      })
      //DatabaseService.insertSong(knexInstance)
    }
    res
    .status(201)
    .send(results)
  })

databaseRouter
  .route('/artists')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    DatabaseService.getArtists(knexInstance)
      .then(artists => {
        res.json(artists.map(serializeArtist))
      })
      .catch(next)
  })
//get songs(for search page)
//get artists
//post songs(to databse)
//post artists

module.exports = databaseRouter