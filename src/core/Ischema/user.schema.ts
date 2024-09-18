import { Schema, model } from "mongoose";
import type { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const UserModel = model<IUser>("user", UserSchema);
