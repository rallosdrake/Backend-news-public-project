const data = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api",
  },
  "GET /api/topics": {
    description: "serves an array of all topics",
    queries: [],
    exampleResponse: {
      topics: [{ slug: "football", description: "Footie!" }],
    },
  },
  "GET /api/articles": {
    description: "serves an array of all topics",
    queries: ["author", "topic", "sort_by", "order"],
    exampleResponse: {
      articles: [
        {
          title: "Seafood substitutions are increasing",
          topic: "cooking",
          author: "weegembump",
          body: "Text from the article..",
          created_at: 1527695953341,
        },
      ],
    },
  },
  "DELETE/api/comments/:comment_id": {
    description: "returns 204 no content after successful deletion",
    exampleResponse: { "err.status": 204 },
  },
  "GET/api/articles/:article_id": {
    description: "returns article object with correct properties",
    exampleResponse: {
      comment_id: 1,
      votes: 6,
      created_at: "2020-10-11",
      author: "James",
      body: "this is my article",
    },
  },
  "GET/api/users": {
    description: "returns an array of all users",
    exampleResponse: [
      {
        username: "James",
      },
    ],
  },
  "GET/api/articles/:article_id/comments": {
    description: "returns an array of all comments for a given article id",
    exampleResponse: [
      {
        comment_id: 1,
        votes: 5,
        created_at: "2021-10-9",
        author: "James",
        body: "this is my comment",
      },
    ],
  },
  "POST/api/articles/:article_id/comments": {
    description: "responds with the posted comment when given correct input",
    exampleResponse: {
      comment_id: 1,
      votes: 0,
      created_at: "2046-12-07",
      author: "James",
      body: "this is my comment",
    },
    exampleBody: {
      username: "James",
      body: "this is my comment",
    },
  },
  "PATCH/api/articles/:article_id": {
    description: "returns the updated object when given correct input",
    exampleResponse: {
      author: "James",
      title: "the saga",
      article_id: 1,
      body: "this is my article",
      topic: "cats",
      created_at: "2022-05-03",
      votes: 100,
    },
    exampleBody: { inc_votes: 1 },
  },
};

module.exports = data;
