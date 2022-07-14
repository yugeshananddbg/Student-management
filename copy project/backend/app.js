import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

import { studentRouter } from "./studentRouter.js";

app.use("/api/v1", studentRouter);

