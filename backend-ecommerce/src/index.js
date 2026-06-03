import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";

dotenv.config({
  path: "./.env"
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {

  console.log("MongoDB Connected");

  app.listen(process.env.PORT || 5000, () => {

    console.log(`Server running on port ${process.env.PORT}`);

  });

})
.catch((err) => {

  console.log("MongoDB Error", err);

});

