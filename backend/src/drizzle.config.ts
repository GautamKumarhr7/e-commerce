import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/schema"; // Path to your schema file

const pool = new Pool({
    connectionString: "postgres://user:password@localhost:5432/e-commerce",
});

export const db = drizzle(pool, { schema });
