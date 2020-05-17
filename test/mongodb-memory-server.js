import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
    const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on("error", (e) => {
        if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });

    mongoose.connection.once("open", () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
});

const uri = await mongod.getUri();
const port = await mongod.getPort();
const dbPath = await mongod.getDbPath();
const dbName = await mongod.getDbName();

// some code
//   ... where you may use `uri` for as a connection string for mongodb or mongoose

// you may check instance status, after you got `uri` it must be `true`
mongod.getInstanceInfo(); // return Object with instance data

// you may stop mongod manually
await mongod.stop();

// when mongod killed, it's running status should be `false`
mongod.getInstanceInfo();

// even you forget to stop `mongod` when you exit from script
// special childProcess killer will shutdown it for you
