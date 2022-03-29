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
  test("responds with an article object", () => {
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
  test("responds with correct error message", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((result) => {});
  });
});
