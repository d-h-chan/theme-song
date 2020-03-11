const knex = require('knex')
const app = require('../src/app')
const { serializeArtist } = require('../src/database/database-service')

function cleanTables(db) {
  return db.raw(
    'TRUNCATE songs, artists RESTART IDENTITY CASCADE'
  )
}

describe(`database service object`, function () {

  let db

  let testSongs = [
    {
      title: "How He Loves",
      artist_id: 356827,
      song_url: "https://genius.com/Jesus-culture-how-he-loves-lyrics",
      themes: "love",
      genius_id: 1389970,
      lyrics: "[verse 1] he is jealous for me loves like a hurricane i am tree bending beneath the weight of his wind and mercy when all sudden unaware these afflictions eclipsed by glory realize just how beautiful you are great your affections [chorus] oh us  yeah (2x) [bridge] we portion our prize drawn to redemption grace in eyes if an ocean we're sinking ha so heaven meets earth sloppy wet kiss my heart turns violently inside chest don't have time maintain regrets think about way that [chrous]"
    },
    {
      title: "Reckless Love (Spontaneous) [Live]",
      artist_id: 204702,
      song_url: "https://genius.com/Bethel-music-reckless-love-spontaneous-live-lyrics",
      themes: "love",
      genius_id: 3125586,
      lyrics: "[verse 1] before i spoke a word  you were singing over me have been so good to mebefore took breath breathed your life in kind [chorus] o the overwhelming never-ending reckless love of godo it chases down fights 'til i'm found leaves ninety-nine couldn't earn and don't deserve still give yourself away god yeah 2] when was foe fought for felt no worth paid all ninety-ninei [bridge] there's shadow won't light up mountain climb coming after wall kick lie tear "
    },
  ]

  let testArtists = [
    {
      artist_name: "Bethel Music",
      genius_id: 204702
    },
    {
      artist_name: "Jesus Culture",
      genius_id: 356827
    },
  ]

  let serializedArtists = testArtists.map(serializeArtist)

  let serializedSongs = [
    {
      "artist": "Jesus Culture",
      "themes": "love",
      "title": "How He Loves",
      "url": "https://genius.com/Jesus-culture-how-he-loves-lyrics"
    },
    {
      "artist": "Bethel Music",
      "themes": "love",
      "title": "Reckless Love (Spontaneous) [Live]",
      "url": "https://genius.com/Bethel-music-reckless-love-spontaneous-live-lyrics"
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  before('clean and populate the tables', () => {
    cleanTables(db)
    return db
      .into('artists')
      .insert(testArtists)
  })

  before('add songs', () => {
    return db
      .into('songs')
      .insert(testSongs)
  })

  after('clean the tables', () => cleanTables(db))

  after(() => db.destroy())

  describe(`Get /api/database/artists`, () => {
    it(`responds with 200 and all artists`, () => {
      return supertest(app)
        .get('/api/database/artists')
        .expect(200, serializedArtists)
    })
  })

  describe(`Get /api/database/songs`, () => {
    it(`responds with 200 and selected songs`, () => {
      return supertest(app)
        .get('/api/database/songs?q=love')
        .expect(200, serializedSongs)
    })
  })

  
  describe(`POST /api/database/songs`, () => {

    it(`creates a song, responding with 201 and the new score`, function () {
      this.retries(3)
      let testPostInput = [
        {
          title: "How He Loves",
          artist: "Jesus Culture",
          artistId: 356827,
          url: "https://genius.com/Jesus-culture-how-he-loves-lyrics",
          themes: "love",
          geniusId: 1389970,
        }
      ]
      return supertest(app)
        .post('/api/database/songs')
        .send(testPostInput)
        .expect(201)
        .expect(res => {
          expect(res.body, testPostInput)
        })
    })
  })
  
})