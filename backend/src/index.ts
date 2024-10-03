import { client } from "./db/connection";
import * as dotenv from "dotenv"
import app from "./app"
dotenv.config()
const port:number=3000;
async function connection(){
    await client.connect()
}
connection().then(()=>{
    console.log("database is connected!");
    app.listen(port,()=>{
        console.log(`server is runninnng http://localhost:${port}`)
    })
    
})