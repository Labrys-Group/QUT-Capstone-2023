import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "./connectDatabase";
import nc, { NextConnect } from "next-connect";
import Club from "./Class_Database/Club";
import Member from "./Class_Database/Member";

/**
 * Factory to generate request handlers with default 404 and 500 handlers
 * @returns Next Connect instance with default Error and NotFound handlers configured
 */
export const baseHandlerFactory = () => {
  const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (error: Error, req: NextApiRequest, res: NextApiResponse) => {
      console.log(error);
      res
        .status(500)
        .send({ error: error?.message || "An unexpected error has ocurred" });
    },
    onNoMatch: (req, res) => {
      res
        .status(405)
        .send({ error: "This is not the route you're looking for" });
    },
    attachParams: true,
  });
  return handler;
};

/**
 * Factory to generate request handlers with a DB connection
 * @param uri Database connection string which MUST also include the database name as part of the string. URI required as a parameter such that other ENV validation can be utilised.
 * @returns Base Next Connect instance including a DB connection
 */
export const dbHandlerFactory = (
  mongoDBUri: string
): NextConnect<NextApiRequest, NextApiResponse> => {
  const handler = baseHandlerFactory();
  handler.use(async (req, res, next) => {
    await connectDatabase(mongoDBUri);
    next();
  });
  return handler;
};

/**
 *
 *
 */
const writeDocument = async (type: string, data: Array<object>) => {
  try {
    var obj: any = Club;
    type == "member" ? (obj = Member) : null;
    const result = await (obj as any).insertMany(data);
    return `${Object.keys(result).length} ${type}s inserted`;
  } catch (err) {
    throw err;
  }
};

/**
 *
 *
 */
const readDocument = async (type: string) => {
  try {
    var obj: any = Club;
    type == "member" ? (obj = Member) : null;
    const data = await (obj as any).find().exec();
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 *
 *
 */
const deleteDocument = async (type: String, data: Array<string>) => {
  try {
    var message: Array<string> = [];
    var obj: any = Club;
    type == "member" ? (obj = Member) : null;
    await Promise.all(
      data.map(async (str: String) => {
        let result = await obj.deleteMany({ id: str });
        if (result.deletedCount > 0) {
          message.push(
            `Deleted ${result.deletedCount} ${type}s with id '${str}'`
          );
        } else {
          message.push(
            `No matching ${type}s found with id '${str}' for deletion`
          );
        }
      })
    );
    console.log(message);
    return message;
  } catch (err) {
    throw err;
  }
};

/**
 *
 *
 */
const updateDocument = async (type: string, data: Array<object>) => {
  try {
    var message: Array<string> = [];
    var obj: any = Club;
    type == "member" ? (obj = Member) : null;
    await Promise.all(
      data.map(async (cla: any) => {
        const result = await obj.updateMany({ id: cla.id }, cla);
        if ((await result.modifiedCount) > 0) {
          message.push(`Updated ${await result.modifiedCount} objects`);
        } else {
          message.push(`No matching ${type}s found for updating`);
        }
      })
    );
    return message;
  } catch (err) {
    throw err;
  }
};

export { writeDocument, readDocument, deleteDocument, updateDocument };
