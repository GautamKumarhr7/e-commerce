import { drizzle } from "drizzle-orm/node-postgres";
import { client } from "./connection";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

async function migrations() {
  await client.connect();

  const db = drizzle(client, { schema });

  console.log("Running the migrations");

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Done with migrations...");
}

migrations()
  .catch((err) => {
    console.log(err);
  })
  .finally(() => client.end());
