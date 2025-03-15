import dotenv from "dotenv";
import { app } from "./app.js";
import connectToDB from "./db/index.js";

dotenv.config({
    path : "./.env"
});

const PORT: number = Number(process.env.PORT) || 8001;

connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error("Mongo DB Connection Error", err);
    });
