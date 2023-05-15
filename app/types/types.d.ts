/** extend the Session type provided by NextAuth.js to include new property owns:any */

import "next-auth";

declare module "next-auth" {
  interface Session {
    owns: any; // Replace 'any' with the actual type of 'owns'
  }
}
