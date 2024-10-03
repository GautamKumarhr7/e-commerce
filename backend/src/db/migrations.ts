// import { client } from "./connection";
// import { drizzle } from "drizzle-orm/node-postgres";
// import * as schema from "./schema";
// import { migrate } from "drizzle-orm/postgres-js/migrator";

// async function migration(){
//     await client.connect();
//     const db=drizzle(client,{schema});
//     console.log("migration is running!");
//     await migrate(db,{migrationsFolder:"./drizzle"})
//     console.log("migration is completed!")
// };
// migration().catch((err)=>{
//     console.log(err);
// }).finally(()=>{
//     client.end();
// });