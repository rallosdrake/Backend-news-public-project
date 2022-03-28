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
    const res = await request(app).get(`/api/topics`).expect(200);
    return res.body.topics.forEach((topic) => {
      console.log(res.body);
      expect(topic).toMatchObject(topicObj);
    });
  });
  test.only(`404: invalid path results in a 404 error`, async () => {
    const res = await request(app).get(`/api/not_a_path`).expect(404);
    console.log(res.body, "!");
    return expect(res.body.msg).toBe("Route not found");
  });
});
