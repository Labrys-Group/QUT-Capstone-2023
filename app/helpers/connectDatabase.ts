// eslint-disable-next-line eslint-comments/disable-enable-pair -- IDK why I have to do this. Aidan help??
/* eslint-disable no-unused-expressions -- This is a shortcut to prevent logging after Jest has concluded testing */
import mongoose from "mongoose";

/* This is one potential solution - whether or not this appropriately caches will need to be monitored
Another solution potential: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
*/

let cachedDbConnection: typeof mongoose | null = null;

/**
 *
 * @param uri Database connection string which MUST also include the database name as part of the string
 * @returns Promise that resolves to the Mongoose connection instance
 */
const connectDatabase = async (uri: string) => {
  if (cachedDbConnection) {
    console.log("Using cached DB connection");
    return cachedDbConnection;
  }

  cachedDbConnection = await mongoose.connect(uri, {
    // Buffering means mongoose will queue up operations if it gets
    // disconnected from MongoDB and send them when it reconnects.
    // With serverless, better to fail fast if not connected.
    bufferCommands: false,
    writeConcern: {
      w: "majority",
    },
    retryWrites: true,
    maxIdleTimeMS: 10000,
  });
  cachedDbConnection.connections.map((info) =>
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
  );

  console.log("Using fresh DB connection");
  return cachedDbConnection;
};

export { connectDatabase };
