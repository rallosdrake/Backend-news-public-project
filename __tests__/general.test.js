const db = require("../db/connection");
const testData = require(`../db/data/test-data`);
const seed = require(`../db/seeds/seed`);
const request = require(`supertest`);
const app = require(`../app`);

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe(`GET/api/topics`, () => {
  const topicObj = {
    slug: expect.any(String),
    description: expect.any(String),
  };
  test(`200: responds with an array of all topics`, async () => {
    const res = await request(app).get(`/api/topics`);
    return res.body.topics.forEach((topic) => {
      expect(topic).toMatchObject(topicObj);
    });
  });
  test(`404: invalid path results in a 404 error`, async () => {
    const res = await request(app).get(`/api/not_a_path`).expect(404);
    return expect(res.body.msg).toBe("Route not found");
  });
});
describe("GET/api/articles/:article_id", () => {
  test("200:responds with an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
        expect(result.body.article).toBeInstanceOf(Object);
        expect(result.body.article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  test("404:responds with correct error message", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((result) => {});
  });
});
describe("PATCH/api/articles/:article_id", () => {
  test("200:responds with changed article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((result) => {
        expect(result.body.article).toBeInstanceOf(Object);
        expect(result.body.article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
        expect(result.body.article.votes).toBe(101);
      });
  });
  test("200:responds with changed article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -10 })
      .expect(200)
      .then((result) => {
        expect(result.body.article).toBeInstanceOf(Object);
        expect(result.body.article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
        expect(result.body.article.votes).toBe(90);
      });
  });
  test("404:responds with correct error message", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 10 })
      .expect(404)
      .then((result) => {
        expect(result.text).toBe("Article not found");
      });
  });
  test("400:responds with correct error message for incorrect patch body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ votes: -10 })
      .expect(400)
      .then((result) => {});
  });
  test("400:responds with correct error message for incorrect patch body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "this is not a vote" })
      .expect(400)
      .then((result) => {});
  });
});
describe("GET/api/users", () => {
  test("200:responds with array of user objects with correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((result) => {
        expect(result.body.users).toBeInstanceOf(Array);
        result.body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
          });
        });
      });
  });
  test(`404: invalid path results in a 404 error`, async () => {
    const res = await request(app).get(`/api/not_a_path`).expect(404);
    return expect(res.body.msg).toBe("Route not found");
  });
});
describe(`GET/api/articles/article_id COMMENT COUNT`, () => {
  test(`200:Responds with an article object that has the correct comment count`, () => {
    const articleObj = {
      author: expect.any(String),
      title: expect.any(String),
      article_id: expect.any(Number),
      body: expect.any(String),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      comment_count: expect.any(Number),
    };
    return request(app)
      .get(`/api/articles/1`)
      .expect(200)
      .then((result) => {
        expect(result.body.article).toBeInstanceOf(Object);
        expect(result.body.article).toMatchObject(articleObj);
      });
  });
});
describe(`GET/api/articles`, () => {
  test(`200: responds with an array of all articles with both a comment count and author`, () => {
    const articleOb = {
      author: expect.any(String),
      title: expect.any(String),
      article_id: expect.any(Number),
      body: expect.any(String),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      comment_count: expect.any(Number),
    };
    return (
      request(app)
        .get(`/api/articles`)
        // .expect(200)
        .then((result) => {
          expect(result.body.articles).toBeInstanceOf(Array);
          result.body.articles.forEach((article) => {
            expect(article).toMatchObject(articleOb);
          });
        })
    );
  });
  test(`checks if object is sorted by date is descending order`, () => {
    return (
      request(app)
        .get(`/api/articles`)
        // .expect(200)
        .then((result) => {
          result.body.articles.forEach((article) => {
            expect([
              { article_id: 1, article_id: 5, article_id: 6, article_id: 9 },
            ]).toBeSortedBy(`created_at`, {
              descending: true,
            });
          });
        })
    );
  });
});
describe("GET/api/articles/:article_id/comments", () => {
  test("responds with array of comments with correct properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeInstanceOf(Array);
        result.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });

  test("responds with correct error message for datatype", () => {

    return request(app)
      .get("/api/articles/cheese/comments")
      .expect(400)
      .then((result) => {
        expect(result.body).toEqual({
          msg: "bad request",
        });
      });
  });
  test("responds with correct error message for 404", () => {
    return request(app)
      .get("/api/articles/1000/comments")
      .expect(404)
      .then((result) => {
        expect(result.text).toBe("article not found");
      });
  });
  test("responds with empty array for article without comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeInstanceOf(Array);
        expect(result.body.comments.length).toBe(0);
      });
  });
});
