import express from "express";
import indexRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());

app.use(indexRouter);

app.use(errorMiddleware);

export default app;