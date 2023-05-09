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

// update data
apiHandler.post(async (req, res) => {
  const type = req.body.type;
  const data = req.body.content;
  let result = await updateDocument(type, data);
  res.status(200).json(result);
});

// get data
apiHandler.get(async (req, res) => {
  const type = req.body.type;
  let result = await readDocument(type);
  res.status(200).json(result);
});

// add data
apiHandler.put(async (req, res) => {
  const type = req.body.type;
  const data = req.body.content;
  let result = await writeDocument(type, data);
  res.status(200).send(JSON.stringify(result));
});

// delete data
apiHandler.delete(async (req, res) => {
  const type = req.body.type;
  const data = req.body.content;
  let result = await deleteDocument(type, data);
  res.status(200).json(result);
});

export default apiHandler;
