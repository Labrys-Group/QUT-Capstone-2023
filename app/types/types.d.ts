import "next-auth";

declare module "next-auth" {
  interface Session {
    owns: any; // Replace 'any' with the actual type of 'owns'
  }
}
