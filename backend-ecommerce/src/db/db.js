import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {

        const connection = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )

        console.log(connection.connection.name);

        console.log("MongoDB Connected");

    } catch (error) {

        console.log("MONGODB error", error);

    }
}

export default connectDB