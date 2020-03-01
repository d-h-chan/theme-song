const DatabaseService = {
  getSongs(knex, search) {
    return knex.select('*')
      .from('songs')
      .innerJoin('artists', 'songs.artist_id', 'artists.genius_id')
      .where('lyrics', 'like', `%${search}%`)
      .orWhere('themes', 'like', `%${search}%`)
  },
  getAllSongs(knex) {
    return knex.select('*')
      .from('songs')
      .innerJoin('artists', 'songs.artist_id', 'artists.genius_id')
      .orderBy('title', 'desc')
  },
  insertSong(knex, songs) {
    return knex.insert(songs)
      .into('songs')
      .returning('*')
      .then(rows => {
        return songs
      })
      .catch(x => {
        if (!isUniqueViolationError(x)) throw x
        return songs
      })
  },
  getArtists(knex) {
    return knex.select('*')
      .from('artists')
  },
  insertArtist(knex, artists) {
    return knex.insert(artists)
      .into('artists')
      .returning('*')
      .then(rows => {
        return artists
      })
      .catch(x => {
        if (!isUniqueViolationError(x)) throw x
        return artists
      })
      
  },
}

module.exports = DatabaseService

const isUniqueViolationError = err => err.code === '23505'
