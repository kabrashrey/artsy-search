import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import routes
import healthCheckRouter from "./routes/health_check.routes";
import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
import searchRouter from "./routes/search.routes";
import artistsRouter from "./routes/artists.routes";
import artworksRouter from "./routes/artworks.routes";
import genesRouter from "./routes/genes.routes";
import favsRouter from "./routes/favs.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// common middlewares
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/health_check", healthCheckRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/search", searchRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/artworks", artworksRouter);
app.use("/api/genes", genesRouter);
app.use("/api/favourites", favsRouter);

app.use(errorHandler);

export { app };
