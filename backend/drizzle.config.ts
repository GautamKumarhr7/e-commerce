import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

let dbUrl:string = "";

if (process.env.NODE_ENV === "dev") {
    dbUrl = process.env.DATABASE_URL as string;
}

console.log("Node env: " + process.env.NODE_ENV);
console.log("Database URL: " + dbUrl);

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
      dbUrl
  },
} satisfies Config;
