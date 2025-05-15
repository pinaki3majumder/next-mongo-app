import mongoose from "mongoose";

let isConnected = false; // To ensure we connect only once

export async function dbConnect() {
    if (isConnected) {
        // Already connected
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);

        isConnected = true;
        console.log("✅ MongoDB connected");

        // Add event listeners only once
        mongoose.connection.once("connected", () => {
            console.log("🔌 MongoDB connection established");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
    }
}

// export async function dbConnect() {
//     try {
//         mongoose.connect(process.env.MONGO_URI!);
//         const connection = mongoose.connection;
//         connection.on('connected', () => {
//             console.log('MongoDB connected successfully');
//         })
//         connection.on('error', (err) => {
//             console.log('MongoDB connection error', err);
//             process.exit();
//         })
//     } catch (error) {
//         console.log(error);
//         console.log('Something went wrong!!!');
//     }
// }