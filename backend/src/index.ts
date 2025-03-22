import { app } from "./app.js";
import connectToDB from "./db/index.js";

const PORT: number = 8000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Mongo DB Connection Error", err);
  });
