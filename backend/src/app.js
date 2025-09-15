// src/app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // ← เพิ่ม
import router from "./routes/route.js";

const app = express();

// ---------- CORS ----------
app.use(cors());

app.use(bodyParser.json());
app.use("/api", router);

export default app;
