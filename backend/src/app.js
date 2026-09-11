import express from "express";
import cors from "cors";
import helmet from "helmet";
import winnerRoutes from "./routes/winnerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import giveawayRoutes from "./routes/giveawayRoutes.js";
import participationRoutes from "./routes/participationRoutes.js";

import {
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "100kb",
  })
);

app.get(
  "/api/health",
  (req, res) => {
    return res.status(200).json({
      success: true,

      message:
        "VELOOP Giveaway API is running",

      environment:
        process.env.NODE_ENV ||
        "development",
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/giveaways",
  participationRoutes
);

app.use(
  "/api/giveaways",
  giveawayRoutes
);

app.use(
  "/api/giveaways",
  winnerRoutes
);

app.use((req, res) => {
  return res.status(404).json({
    success: false,

    code:
      "ROUTE_NOT_FOUND",

    message:
      "The requested API endpoint was not found.",
  });
});

app.use(errorHandler);

export default app;