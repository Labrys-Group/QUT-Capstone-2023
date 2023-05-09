import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "./connectDatabase";
import mongoose from "mongoose";
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
    if (type == "member") {
      obj = Member;
    }
    const result = await (obj as any).insertMany(data);
    return `${Object.keys(result).length} objects inserted`;
  } catch (e) {
    return e;
  }
};

/**
 *
 *
 */
const readDocument = async (type: string) => {
  try {
    var obj: any = Club;
    if (type == "member") {
      obj = Member;
    }
    const data = await (obj as any).find().exec();
    console.log(Object.keys(data).length);
    console.log(JSON.stringify(data));
    return data;
  } catch (e) {
    return e;
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
    if (type == "member") {
      obj = Member;
    }
    await Promise.all(
      data.map(async (str: String) => {
        let result = await obj.deleteMany({ id: str });
        if (result.deletedCount > 0) {
          message.push(
            `Deleted ${result.deletedCount} members with id '${str}'`
          );
        } else {
          message.push(
            `No matching members found with id '${str}' for deletion`
          );
        }
      })
    );
    console.log(message);
    return message;
  } catch (err) {
    return err;
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
    if (type == "member") {
      obj = Member;
    }
    await Promise.all(
      data.map(async (cla: any) => {
        const result = await obj.updateMany({ id: cla.id }, cla);
        if ((await result.modifiedCount) > 0) {
          message.push(`Updated ${await result.modifiedCount} objects`);
        } else {
          message.push("No matching objects found for updating");
        }
      })
    );
    return message;
  } catch (err) {
    return err;
  }
};

export { writeDocument, readDocument, deleteDocument, updateDocument };
