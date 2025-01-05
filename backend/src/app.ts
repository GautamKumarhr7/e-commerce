import Express from "express";
import dotenv from "dotenv";
import router from "./routes/app.route";
dotenv.config();
const app = Express();
app.use(Express.json());
app.use("/", router);

export default app;
