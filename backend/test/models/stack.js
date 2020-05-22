const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

let mongoServer;
const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above

const stacksDb = require("../../api/db/stacks");

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Stack DB Layer", () => {
  describe("getAllStackDB", () => {
    it("should return empty array", async () => {
      const stacks = await stacksDb.getAllStacksDB();
      expect(stacks.length).to.equal(0);
    });
  });
});
