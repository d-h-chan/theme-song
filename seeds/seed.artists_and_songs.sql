INSERT INTO artists (artist_name, genius_id)
VALUES
  ('Bethel Music', 204702),
  ('David Brymer', 452676),
  ('Jesus Culture', 356827)
  ON CONFLICT (genius_id)
  DO NOTHING;

INSERT INTO songs (title, song_url, themes, lyrics, genius_id, artist_id)
VALUES
  ( 'Reckless Love (Spontaneous) [Live]', 
    'https://genius.com/Bethel-music-reckless-love-spontaneous-live-lyrics',
    'chase',
    '[verse 1] before i spoke a word  you were singing over me have been so good to mebefore took breath breathed your life in kind [chorus] o the overwhelming never-ending reckless love of godo it chases down fights ''til i''m found leaves ninety-nine couldn''t earn and don''t deserve still give yourself away god yeah 2] when was foe fought for felt no worth paid all ninety-ninei [bridge] there''s shadow won''t light up mountain climb coming after wall kick lie tear',
    '3125586',
    '204702'
  ),
  ( 'How He Loves', 
    'https://genius.com/Jesus-culture-how-he-loves-lyrics',
    'love',
    '[verse 1] he is jealous for me loves like a hurricane i am tree bending beneath the weight of his wind and mercy when all sudden unaware these afflictions eclipsed by glory realize just how beautiful you are great your affections [chorus] oh us  yeah (2x) [bridge] we portion our prize drawn to redemption grace in eyes if an ocean we''re sinking ha so heaven meets earth sloppy wet kiss my heart turns violently inside chest don''t have time maintain regrets think about way that [chrous]',
    '1389970',
    '356827'
  )
  ON CONFLICT (genius_id)
  DO NOTHING;
