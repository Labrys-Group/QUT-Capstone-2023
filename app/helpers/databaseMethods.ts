import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "./connectDatabase";

import nc, { NextConnect } from "next-connect";

/**
 * Factory to generate request handlers with default 404 and 500 handlers
 * @returns Next Connect instance with default Error and NotFound handlers configured
 */
export const baseHandlerFactory = () => {
    const handler = nc<NextApiRequest, NextApiResponse>({
      onError: (
        error: Error,
        req: NextApiRequest,
        res: NextApiResponse
      ) => {
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
      await next();
    });
    return handler;
  };