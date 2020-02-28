require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const geniusRouter = require('./genius/genius-router')
const databaseRouter = require('./database/database-router')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/genius', geniusRouter)
app.use('/api/database', databaseRouter)

app.get('/', (req, res) => {
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

  ///genius api to get url
  /*fetch("https://api.genius.com/search?q=reckless%20bethel", {
      method: 'GET',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        //'Host': 'api.genius.com',
        'Authorization': 'Bearer UJtnKR7B4cY6rdS58kUelZEEAjV8yIywavswz4PwhnC0em41N4euD3clGoczqICG',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        //console.log(res)
        return res.json()
      })
      .then(json => {
        //console.log(json)
        res.send(json)

      })*/
  ///
  //res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app