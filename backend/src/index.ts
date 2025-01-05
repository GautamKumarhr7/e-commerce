import { client } from "./db/connection";
import * as dotenv from "dotenv";
import app from "./app";
dotenv.config();
// const port:number=3000;
const port = process.env.port || 3001;
async function connectionVerifaction() {
  await client.connect();
}
connectionVerifaction().then(() => {
  console.log("database is connected!");
  app.listen(port, () => {
    console.log(`server is runninnng http://localhost:${port}`);
  });
});
