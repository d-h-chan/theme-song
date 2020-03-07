function cleanTables(db) {
  return db.raw(
    'TRUNCATE songs, artists RESTART IDENTITY CASCADE'
    )
}

module.exports = { 
  cleanTables,
}