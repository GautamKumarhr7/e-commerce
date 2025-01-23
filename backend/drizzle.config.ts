import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./src/db/schema"; // Path to your schema file


import type { Config } from "drizzle-kit";

console.log("Drizzle config loaded");

export default {
  schema: "./src/db/schema.ts", // Adjust the path if schema is elsewhere
  out: "./drizzle",            // Directory for migrations
  dialect: "postgresql",       // Specify the database dialect
} satisfies Config;