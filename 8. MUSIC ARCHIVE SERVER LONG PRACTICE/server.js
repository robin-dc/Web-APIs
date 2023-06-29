const http = require('http');
const fs = require('fs');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    // Your code here


    // Get all the artists
    if(req.method === "GET" && req.url === "/artists"){
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      const result = JSON.stringify(artists)
      return res.end(result)
    }

    // Get all the albums
    else if(req.method === "GET" && req.url === "/albums"){
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      const result = JSON.stringify(albums)
      return res.end(result)
    }

    // Get all songs of a specific artist based on artistId
    else if(req.method === "GET" && req.url.startsWith("/artists/") && req.url.endsWith("/songs")){
      const urlParts = req.url.split("/")
      const id = urlParts[2]

      const album = Object.values(albums).filter(album => album.artistId === Number(id))
      const albumIds = album.map(obj => obj.albumId)

      let artistSongs = [];

      albumIds.forEach(albumId => {
        Object.values(songs).forEach(song => {
          if(song.albumId === albumId){
            artistSongs.push(song);
          }
        })
      })

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(artistSongs))
    }

    // Get all songs of a specific album based on albumId
    else if(req.method === "GET" && req.url.startsWith("/albums/") && req.url.endsWith("/songs")){
      const urlParts = req.url.split("/")
      const id = urlParts[2]

      const albumSongs = Object.values(songs).filter(song => song.albumId === Number(id))

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(albumSongs))
    }

    // Get all albums of a specific artist based on artistId
    else if(req.method === "GET" && req.url.startsWith("/artists/") && req.url.endsWith("/albums")){
      const urlParts = req.url.split("/")
      const id = urlParts[2]

      const album = Object.values(albums).filter(album => album.artistId === Number(id))

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")

      return res.end(JSON.stringify(album))
    }

    // Get a specific artist's details based on artistId
    else if(req.method === "GET" && req.url.startsWith("/artists/")){
      const urlParts = req.url.split("/artists/")
      const id = urlParts[1]
      const artist = Object.values(artists).find(artist => artist.artistId === Number(id))

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      const result = JSON.stringify(artist)

      return res.end(result)
    }

    // Add an artist
    else if(req.method === "POST" && req.url === "/artists"){
      const newId = getNewArtistId()
      req.body = JSON.stringify({"artistId": newId, "name" : req.body.name}) // needs body {"name" : "Lesserafim"}
      const newArtist = {[newId] : JSON.parse(req.body)}

      artists = {...artists, ...newArtist}
      res.statusCode = 201
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(newArtist[newId]))
    }

    // Edit a specified artist by artistId
    else if(req.url.startsWith("/artists/") && req.method === "PATCH" || req.method === "PUT"){
      const urlParts = req.url.split("/artists/")
      const id = urlParts[1]
      const artist = Object.values(artists).find(artist => artist.artistId === Number(id))
      // needs body {"name" : "Lesserafim"}
      artist.name = req.body.name

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(artist))
    }

    // Delete a specified artist by artistId
    else if(req.method === "DELETE" && req.url.startsWith("/artists/")){
      const urlParts = req.url.split("/artists/")
      const id = urlParts[1]

      delete artists[id]

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(artists))
    }

    // Get a specific album's details based on albumId
    else if(req.method === "GET" && req.url.startsWith("/albums/")){
      const urlParts = req.url.split("/albums/")
      const id = urlParts[1]

      const album = Object.values(albums).find(album => album.albumId === Number(id))

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      const result = JSON.stringify(album)

      return res.end(result)
    }

    // Add an album to a specific artist based on artistId
    else if(req.method === "POST" && req.url.startsWith("/artists/") && req.url.endsWith("/albums")){
      const urlParts = req.url.split("/")
      const id = urlParts[2]

      const albumId = getNewAlbumId()

      req.body = JSON.stringify({"albumId": albumId, "name" : req.body.name, "artistId" : Number(id)})
      const newAlbum = {[albumId] : JSON.parse(req.body)}
      // needs body { "name" : "Sync Dive"}

      albums = {...albums, ...newAlbum}
      res.statusCode = 201
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(newAlbum[albumId]))
    }

    // Edit a specified song by songId
    else if(req.method === "PATCH" || req.method === "PUT" && req.url.startsWith("/songs/")){
      const urlParts = req.url.split("/songs/")
      const id = urlParts[1]

      const songEdited = Object.values(songs).find(song => song.songId === Number(id))
      // needs body {"name": "New Song", "trackNumber": number, "lyrics": "txt"}

      songEdited.name = req.body.name
      songEdited.trackNumber = req.body.trackNumber
      songEdited.lyrics = req.body.lyrics

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(songEdited))
    }

    // Edit a specified album by albumId
    else if(req.method === "PATCH" || req.method === "PUT" && req.url.startsWith("/albums/")){
      const urlParts = req.url.split("/albums/")
      const id = urlParts[1]

      const album = Object.values(albums).find(album => album.albumId === Number(id))
      // needs body {"name" : "The Album"}
      album.name = req.body.name

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(album))
    }

    // Delete a specified album by albumId
    else if(req.method === "DELETE" && req.url.startsWith("/albums/")){
      const urlParts = req.url.split("/albums/")
      const id = urlParts[1]

      delete albums[id]

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(albums))
    }

    // Get all songs of a specified trackNumber
    else if(req.method === "GET" && req.url.startsWith("/trackNumbers/") && req.url.endsWith("/songs")){
      const urlParts = req.url.split("/")
      const id = urlParts[2]

      const trackSongs = Object.values(songs).filter(song => song.trackNumber === Number(id))

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(trackSongs))
    }

    // Get a specific song's details based on songId
    else if(req.method === "GET" && req.url.startsWith("/songs/")){
      const urlParts = req.url.split("/songs/")
      const id = urlParts[1]

      const songSong = Object.values(songs).find(song => song.songId === Number(id))

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      const result = JSON.stringify(songSong)

      return res.end(result)
    }

    // Add a song to a specific album based on albumId
    else if(req.method === "POST" && req.url.startsWith("/albums/") && req.url.endsWith("/songs")){
      const urlParts = req.url.split("/")
      const id = urlParts[2]

      const newId = getNewSongId()

      req.body = JSON.stringify({"songId": newId, "name" : req.body.name, "trackNumber" : req.body.trackNumber, "albumId": Number(id), "lyrics" : req.body.lyrics})
      // needs body {"name": "New Song", "trackNumber": number, "lyrics": "txt"}

      const newSong = {[newId] : JSON.parse(req.body)}

      songs = {...songs, ...newSong}
      res.statusCode = 201
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(newSong[newId]))
    }

    // Delete a specified song by songId
     else if(req.method === "DELETE" && req.url.startsWith("/songs/")){
      const urlParts = req.url.split("/songs/")
      const id = urlParts[1]

      delete songs[id]

      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      return res.end(JSON.stringify(songs))
    }

    else{
      res.statusCode = 404;
      return res.write("Endpoint not found");
    }
  });
});

const port = 8000;

server.listen(port, () => console.log('Server is listening on port', port));
