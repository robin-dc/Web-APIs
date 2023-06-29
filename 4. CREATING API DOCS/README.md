# Exercise: API Endpoints

In this exercise, you will be determining RESTful endpoints for an API server
based on the given scenarios.

## Set up

Clone the exercise from the [starter].

## Conventions for RESTful Endpoints for an API Server

The following tables show the conventions for RESTful Endpoints of an API
server.

| Path Pattern             | HTTP Verb | Meaning                                          |
| ------------------------ | --------- | ------------------------------------------------ |
| /resource-name           | GET       | Index: Get all of the records for the resource   |
| /resource-name           | POST      | Create: Create a new record for the resource     |
| /resource-name/record-id | GET       | Details: Get the details of the specified record |
| /resource-name/record-id | PUT/PATCH | Update: Update the specified record              |
| /resource-name/record-id | DELETE    | Delete: Delete the specified record              |

For Nested Resources:

| Path Pattern                             | HTTP Verb | Meaning                                                                                |
| ---------------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| /resource-name/record-id/nested-resource | GET       | Index: Get all of the records for the nested resources related to the specified record |
| /resource-name/record-id/nested-resource | POST      | Create: Create a new record for the nested resource related to the specified record    |
| /nested-resource/nested-record-id        | GET       | Details: Get the details of the specified nested resource's record                     |
| /nested-resource/nested-record-id        | PUT/PATCH | Update: Update the specified nested resource's record                                  |
| /nested-resource/nested-record-id        | DELETE    | Delete: Delete the specified nested resource's record                                  |

## Instructions

Determine an endpoint for each of the following use cases. Don't worry about
getting it perfect as this is just practice!

API endpoints use similar routes to a traditional web server's RESTful routes.
The major difference between API endpoints those of a traditional web server is
that API endpoints can use all HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`,
`DELETE`).

For example, to edit a specific post, the API endpoint could be
`PATCH /posts/:postId`

- Get all the posts = GET api/posts
- Create a new post = POST api/posts
- Edit a post = PUT/PATCH api/posts/:postId
- Create a new user = POST api/users
- Get the comments for a post = GET api/posts/:postId/comments
- Create a comment for a post = POST api/posts/:postId/comments
- Edit a comment for a post = PUT/PATCH api/posts/:postId/comments/:commentId
- Delete a comment for a post  = DELETE api/posts/:postId/comments/:commentId
- Add a like for a post = POST api/posts/:postId/like
- Remove a like for a post  = DELETE api/posts/postId/like
- Get all the posts of a user = GET api/users/:userId/posts
- Submit a search on posts = POST api/posts/search

[starter]: https://github.com/appacademy/practice-for-week-08-creating-api-docs
