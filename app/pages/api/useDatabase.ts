import {
  dbHandlerFactory,
  writeDocument,
  readDocument,
  deleteDocument,
  updateDocument,
} from "../../helpers/databaseMethods";

const databaseName = "MembersOnly";

const mongoDBUri = `mongodb+srv://sunelia:sunelia@membersonly.1iuvkan.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const apiHandler = dbHandlerFactory(mongoDBUri);

/**
 * updating data
 * @constructor req two properties, "type" and "content" in body
 * @param type  "member" or "club"
 * @param content a matched object array
 * @requires id must be included in each object
 * @returns a string array to show a list of updating result for each object Or an error
 */
apiHandler.post(async (req, res) => {
  const type = req.body.type;
  const data = req.body.content;
  let result = await updateDocument(type, data);
  res.status(200).json(result);
});

/**
 * getting data
 * check related collection by given type
 * @constructor req one property, "type" in body
 * @param type  "member" or "club"
 * @returns an object array to show a list of matched objects
 */
apiHandler.get(async (req, res) => {
  const type = req.body.type;
  let result = await readDocument(type);
  res.status(200).json(result);
});

/**
 * adding data
 * @constructor req two properties, "type" and "content" in body
 * @param type  "member" or "club"
 * @param content a matched object array
 * @requires id must be included in each object
 * @returns a string to notify how many object have been added Or an error
 */
apiHandler.put(async (req, res) => {
  const type = req.body.type;
  const data = req.body.content;
  let result = await writeDocument(type, data);
  res.status(200).send(JSON.stringify(result));
});

/**
 * deleting data
 * @constructor req two properties, "type" and "content" in body
 * @param type  "member" or "club"
 * @param content a matched object array
 * @requires id must be included in each object
 * @returns a string array to show a list of adding result for each object Or an error
 */
// delete data
apiHandler.delete(async (req, res) => {
  const type = req.body.type;
  const data = req.body.content;
  let result = await deleteDocument(type, data);
  res.status(200).json(result);
});

export default apiHandler;
