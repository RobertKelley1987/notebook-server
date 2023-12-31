import "dotenv/config";
import express from "express";
import cors from "cors";
import { configSession } from "./session/index.js";
import noteRoutes from "./routers/notes.js";
import indexRoutes from "./routers/index.js";
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(configSession());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/notes", noteRoutes);
app.use("/", indexRoutes);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
