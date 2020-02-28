const express = require('express')
const fetch = require('node-fetch')
const geniusRouter = express.Router()


geniusRouter
  .route('/search')
  .get((req, res) => {

    fetch(`https://api.genius.com/search?q=${encodeURI(req.query.q)}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer UJtnKR7B4cY6rdS58kUelZEEAjV8yIywavswz4PwhnC0em41N4euD3clGoczqICG',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(json => {
        let items = json.response.hits
        let output = []
        for (let i = 0; i < items.length; i++) {
          let result = items[i].result
          output.push({
            title: result.title,
            artist: result.primary_artist.name,
            url: result.url,
            geniusId: result.id,
            artistId: result.primary_artist.id
          });
        }
        res.send(output)
      })
  })

geniusRouter
  .route('/search/:artist_id')
  .get((req, res) => {
    fetch(`https://api.genius.com/artists/${req.params.artist_id}/songs?sort=popularity&per_page=30`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer UJtnKR7B4cY6rdS58kUelZEEAjV8yIywavswz4PwhnC0em41N4euD3clGoczqICG',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(json => {
        let items = json.response.songs
        let output = []
        for (let i = 0; i < items.length; i++) {
          let result = items[i]
          output.push({
            title: result.title,
            artist: result.primary_artist.name,
            url: result.url,
            geniusId: result.id,
            artistId: result.primary_artist.id
          });
        }
        res.send(output)
      })
  })

/*fetch('https://genius.com/Jesus-culture-how-he-loves-lyrics')
    .then(_res => {
      return (_res.text())
    })
    .then(html => {
      //console.log(html)
      let soup = new JSSoup(html);
      let found = soup.find("div", "lyrics").getText()
      //console.log(processLyrics(found))
      res.send(processLyrics(found))
    })*/

module.exports = geniusRouter
