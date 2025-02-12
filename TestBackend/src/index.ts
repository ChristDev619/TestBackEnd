import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { baseRouter } from "./routes/base.routes";
import { adminRouter } from "./routes/admin.routes";
import { authRouter } from "./routes/auth.routes";

dotenv.config();

// Port validation and initialization
if (!process.env.PORT) {
  process.exit(1);
}
const port: number = parseInt(process.env.PORT as string, 10) || 8000;

// Initialize Express Server App
const app: Express = express();

app.use(express.static("./public"));

// Middleware
app.use(
  cors({
    origin: ["https://sportsrankings.world", "http://localhost:3000"],
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/1234", (req, res) => {
  return res.status(200).json("WELCOME 1234");
});

app.get("/", (req, res) => {
  return res.status(200).json();
});

app.use("/api/admin", adminRouter);
app.use("/api/", baseRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`server on ${port}`);
});
