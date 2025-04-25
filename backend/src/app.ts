import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import routes
import healthCheckRouter from "./routes/health_check.routes.js";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import searchRouter from "./routes/search.routes.js";
import artistsRouter from "./routes/artists.routes.js";
import artworksRouter from "./routes/artworks.routes.js";
import genesRouter from "./routes/genes.routes.js";
import favsRouter from "./routes/favs.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { constants } from "./constants.js";
import { loadSecrets } from "./utils/utils.js";

const app = express();

await loadSecrets();

app.use(
  cors({
    origin: constants.CORS_ORIGIN,
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
