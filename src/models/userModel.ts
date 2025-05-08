import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    pwd: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
    verifyToken: string;
    verifyTokenExpiry: Date;
}

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    pwd: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;