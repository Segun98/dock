import { host } from "./utils/environment";
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import movies from "./Routes/movies";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: host,
    credentials: true,
  })
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use("/", movies);

try {
  app.listen(port, (): void => {
    console.log(`Running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
