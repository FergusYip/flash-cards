const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { expect, assert } = require("chai");
const cardDb = require("../api/db/cards");

let mongoServer;
const opts = { useNewUrlParser: true, useUnifiedTopology: true };

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("getAllCardsDB", () => {
  it("should return empty array if there are no cards", async () => {
    const cards = await cardDb.getAllCardsDB();
    expect(cards.length).to.equal(0);
  });
});

describe("createCardDB", () => {
  it("should return card object", async () => {
    const card = await cardDb.createCardDB("prompt", "answer");
    assert.typeOf(card, "object");
  });

  it("should contain cardId, prompt, and answer properties", async () => {
    const card = await cardDb.createCardDB("prompt", "answer");
    const { cardId, prompt, answer } = card;
    expect(
      [cardId, prompt, answer].every((x) => typeof x != "undefined")
    ).to.equal(true);
  });

  it("should throw error if prompt is missing", async () => {
    assert.Throw(async () => {
      await cardDb.createCardDB(undefined, "answer");
    }, "thrown error");
  });
});
