### Get all the artists

Request components:

- Method: GET
- URL: /artists
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: information about all the artists

  ```json
  [
    {
      "artistId": 1,
      "name": "Red Hot Chili Peppers"
    }
  ]
  ```

Test this in Postman or by using `fetch` in the browser.

### Get a specific artist's details based on artistId

Request components:

- Method: GET
- URL: /artists/:artistId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: specific artist details

```json
    {
      "artistId": 1,
      "name": "Red Hot Chili Peppers"
    }
```

### Add an artist

Request components:

- Method: POST
- URL: /artists
- Headers:
    - Content-Type: application/json
- Body: {
      "artistId": 3,
      "name": "Aespa"
}

Response components:

- Status code: 302
- Headers:
    - Location: /artists/:artistId
- Body: none

### Edit a specified artist by artistId

Request components:

- Method: POST
- URL: /artists/:artistId
- Headers:
    - Content-Type: application/json
- Body: {
      "artistId": 3,
      "name": "Newjeans"
}

Response components:

- Status code: 302
- Headers:
    - Location: /artists/:artistId
- Body: false

### Delete a specified artist by artistId

Request components:

- Method:  POST
- URL: /artists/:artistId/delete
- Headers: none
- Body: none

Response components:

- Status code: 302
- Headers:
    - Location: /artists
- Body: none

### Get all albums of a specific artist based on artistId

Request components:

- Method: GET
- URL: /artists/:artistId/albums
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: array of albums of a specified artist
```json
[
    {
        "name": "Sync",
        "albumId": 1,
        "artistId": 1,
    }
]
```
### Get a specific album's details based on albumId

Request components:

- Method: GET
- URL: albums/:albumId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: album with all the details of the artist ad songs
```json
{
  "name":"Stadium Arcadium",
  "albumId":1,
  "artistId":1,
  "artist":
    {
      "name":"Red Hot Chili Peppers",
      "artistId":1
    },
  "songs":[
    {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
    }
  ]
}
```

### Add an album to a specific artist based on artistId

Request components:

- Method: POST
- URL: /artists/artistId/albums
- Headers:
    - Content-Type: application/json
- Body: {
  "name":"Track Album",
  "albumId":2,
  "artistId":1,
  "artist":
    {
      "name":"Newjeans",
      "artistId":1
    },
  "songs":[
    {
      "name":"Dani Hanni",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
    }
  ]
}

Response components:

- Status code: 302
- Headers:
    - Location: /albums/:albumId
- Body: none

### Edit a specified album by albumId

Request components:

- Method: POST
- URL: /albums/:albumId/edit
- Headers:
    - Content-Type: application/json
- Body: {
    "name":"Track Album",
    "albumId":2,
    "artistId":1,
    "artist":
        {
        "name":"Newjeans",
        "artistId":1
        },
    "songs":[
        {
        "name":"Dani Hanni",
        "lyrics":"",
        "trackNumber":1,
        "songId":1,
        "createdAt":"2023-06-24T00:26:53.000Z",
        "updatedAt":"2023-06-24T00:26:53.000Z",
        "albumId":1
        }
    ]
}

Response components:

- Status code: 302
- Headers:
    - Location: /albums/:albumId
- Body: none

### Delete a specified album by albumId

Request components:

- Method: POST
- URL:  /albums/:albumId/delete
- Headers: none
- Body: none

Response components:

- Status code: 302
- Headers:
    - Location: /albums
- Body: none

### Get all songs of a specific artist based on artistId

Request components:

- Method: GET
- URL: /artists/:artistId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: all songs of artist in array
```json
[
    {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
    }
  ]
```

### Get all songs of a specific album based on albumId

Request components:

- Method: GET
- URL: /albums/:albumId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: all songs of artist in array
```json
[
    {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
    }
  ]
```

### Get all songs of a specified trackNumber

**Note: This one is meant to be a little more challenging, but should still
follow a similar pattern to those above.**

Can you see a pattern between this endpoint and the two previous endpoints?

Hint: Think of how you solved getting all songs by a specific artist and by a
specific album. What is resource that you wanted to get back for those
endpoints? What information was that resource constrained by for each of those
endpoints? Now think about getting all songs by a specific `trackNumber`.
What is the resource you want to get? What information is the resource
constrained by for this endpoint?

Request components:

- Method: GET
- URL: /trackNumbers/:trackNumber/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: all songs in that track in array
```json
[
    {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
    }
  ]
```

### Get a specific song's details based on songId

Request components:

- Method: GET
- URL: /songs/:songId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: song details
```json
    {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
    }
```

### Add a song to a specific album based on albumId

Request components:

- Method: POST
- URL: /albums/:albumId/songs
- Headers:
    - Content-Type: application/json
- Body: {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
}

Response components:

- Status code: 302
- Headers:
    - Location: /albums/:albumId
- Body: none

### Edit a specified song by songId

Request components:

- Method: POST
- URL: /songs/:songId/edit
- Headers:
    -  Content-Type: application/json
- Body: {
      "name":"Dani California",
      "lyrics":"",
      "trackNumber":1,
      "songId":1,
      "createdAt":"2023-06-24T00:26:53.000Z",
      "updatedAt":"2023-06-24T00:26:53.000Z",
      "albumId":1
}

Response components:

- Status code: 302
- Headers:
    - Location: /songs
- Body: none

### Delete a specified song by songId

Request components:

- Method: POST
- URL: /songs/:songId/delete
- Headers: none
- Body: none

Response components:

- Status code: 302
- Headers:
    - Location: /songs
- Body: none
