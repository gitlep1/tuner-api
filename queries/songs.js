const db = require("../db/dbConfig");

const checkIfSongExists = async (songID) => {
  try {
    const song = await db.oneOrNone("SELECT * FROM songs WHERE id=$1", songID);
    return song;
  } catch (err) {
    return err;
  }
};

const getAllSongs = async () => {
  try {
    const song = await db.any("SELECT * FROM songs");
    return song;
  } catch (err) {
    return err;
  }
};

const getOneSong = async (songID) => {
  try {
    const song = await db.one("SELECT * FROM songs WHERE id=$1", songID);
    return song;
  } catch (err) {
    return err;
  }
};

const postNewSong = async (newSong) => {
  try {
    const song = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        newSong.name,
        newSong.artist,
        newSong.album,
        newSong.time,
        newSong.is_favorite,
      ]
    );
    return song;
  } catch (err) {
    return err;
  }
};

const updateOneSong = async (songID, updatedSong) => {
  try {
    const song = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [
        updatedSong.name,
        updatedSong.artist,
        updatedSong.album,
        updatedSong.time,
        updatedSong.is_favorite,
        songID,
      ]
    );
    return song;
  } catch (err) {
    return err;
  }
};

const deleteOneSong = async (songID) => {
  try {
    const song = await db.one(
      "DELETE FROM songs WHERE id=$1 RETURNING *",
      songID
    );
    return song;
  } catch (err) {
    return err;
  }
};

const songOrder = async (order) => {
  try {
    if (order === "asc") {
      const song = await db.any("SELECT * FROM songs ORDER BY name ASC");
      console.log("=== GET /songs order by ASC ", song, " ===");
      return song;
    } else if (order === "desc") {
      const song = await db.any("SELECT * FROM songs ORDER BY name DESC");
      console.log("=== GET /songs order by DESC ", song, " ===");
      return song;
    }
  } catch (err) {
    return err;
  }
};

const songFavoriteFilter = async (favorite) => {
  try {
    if (favorite === "true") {
      const song = await db.any("SELECT * FROM songs WHERE is_favorite=true");
      return song;
    } else if (favorite === "false") {
      const song = await db.any("SELECT * FROM songs WHERE is_favorite=false");
      return song;
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  checkIfSongExists,
  getAllSongs,
  getOneSong,
  postNewSong,
  updateOneSong,
  deleteOneSong,
  songOrder,
  songFavoriteFilter,
};
