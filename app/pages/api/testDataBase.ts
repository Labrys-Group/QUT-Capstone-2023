import {
  dbHandlerFactory,
  getClubs,
  writeDocument,
} from "../../helpers/databaseMethods";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Usage example
const mongoDBUri =
  "mongodb+srv://sunelia:sunelia@membersonly.1iuvkan.mongodb.net/Clubs?retryWrites=true&w=majority";
const apiHandler = dbHandlerFactory(mongoDBUri);
apiHandler.get(async (req, res) => {
  let result = await writeDocument();
  let clubs = await getClubs();
  const data = { message: result, message_1: clubs };
  res.status(200).json(data);
});

export default apiHandler;
