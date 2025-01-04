import dotenv from "dotenv";
import{drizzle}from "drizzle-orm/node-postgres";
import { Client } from "pg";
dotenv.config();

let connectionString ="";

connectionString = process.env.DATABASE_URL!;
export const client=new Client({
    connectionString
});
export const db=drizzle(client);
