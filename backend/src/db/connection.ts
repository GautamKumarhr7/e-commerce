import dotenv from "dotenv";
import{drizzle}from "drizzle-orm/node-postgres";
import { Client } from "pg";
dotenv.config();

let connectionString="";
if(process.env.NODE_ENV=="dev"){
    connectionString=process.env.DATABASE_URL as string;
    
}
console.log("DATABASE_URL:", process.env.DATABASE_URL);
if (!connectionString) {
    throw new Error("DATABASE_URL is missing!");
}
export const client=new Client({
    connectionString,
});
export const db=drizzle(client);