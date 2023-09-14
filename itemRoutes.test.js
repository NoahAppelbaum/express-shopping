"use strict";

const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function () {
  items.push(popsicle);
});

afterEach(function () {
  items = [];
});


describe("GET /items", function () {
  test("get a list of items", async function () {
    const response = await request(app).get("/items");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      "items": [
        {
          "name": "popsicle",
          "price": 1.45
        }
      ]
    });
  });
});


describe("GET /items/:name", function () {
  test("get a particular item", async function () {
    const response = await request(app).get("/items/popsicle");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "name": "popsicle", "price": 1.45 });
  });

  test("bad item request", async function () {
    const response = await request(app).get("/items/BADREQUEST");
    expect(response.statusCode).toEqual(404);
  });
});



describe("POST /items", function () {
  test("create new item", async function () {
    const testItem =
    {
      "name": "test",
      "price": 999
    };

    const response = await request(app).post("/items").send(testItem);

    expect(response.body).toEqual({ "added": testItem });
    expect(response.statusCode).toEqual(201);
  });

  test("bad create item request", async function () {
    const testItem =
    {
      "badRequest": "test",
      "price": 999
    };

    const response = await request(app).post("/items").send(testItem);
    expect(response.statusCode).toEqual(400);
  });
});


describe("PATCH /items/:name", function () {
  test("Patch a particular item", async function () {
    const response = await request(app).patch("/items/popsicle").send(
      {
        "price": 5.99
      }
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      {
        "updated": { "name": "popsicle", "price": 5.99 }
      }
    );
  });

  test("bad patch request", async function () {
    const response = await request(app).patch("/items/popsicle").send(
      {
        "badKey": 5.99
      }
    );
    expect(response.statusCode).toEqual(400);
  });
});

describe("DELETE /items/:name", function () {
  test("delete an item", async function () {
    const response = await request(app).delete("/items/popsicle");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "message": "Deleted" });
  });

  test("delete non-existent item", async function () {
    const response = await request(app).delete("/items/BADREQUEST");
    expect(response.statusCode).toEqual(404);
    expect(items.length).toEqual(1);
  });
});
