import { log } from "console";
import mongoose from "mongoose";

export async function DBconnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection;
        connection.on("connected", () => console.log("Mongoose connected to MongoDB"));
        // If the connection throws an error, log it and exit the process
        connection.on("error", (err) => {
            console.log(`Mongoose connection error: ${err}`);
            process.exit(-1);
        });
    } catch (error) {
        console.log("Error connecting to database");
    }
};
