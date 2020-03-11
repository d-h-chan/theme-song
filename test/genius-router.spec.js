const app = require('../src/app')

describe(`genius router object`, function () {

  describe.only(`Get /api/genius/search/:artist_id`, () => {
    it(`responds with 200`, () => {
      return supertest(app)
        .get('/api/genius/search/204702')
        .expect(200)
    })
  })

  describe.only(`Get /api/genius/search?q=majesty`, () => {
    it(`responds with 200`, () => {
      return supertest(app)
        .get('/api/genius/search?q=majesty')
        .expect(200)
    })
  })
})