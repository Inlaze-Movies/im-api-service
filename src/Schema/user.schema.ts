import { Schema, model } from "mongoose";
import type { Document } from "mongoose";
import type { SoftDelete } from "../services/SoftDelete";

export interface IUser extends Document, SoftDelete {
    name: string;
    email: string;
    password: string;
    role: number;
}

export const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
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
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date(),
    },
    updatedOn: {
        type: Date,
    },
});

UserSchema.methods.softDelete = function (): Promise<IUser> {
    this.isDeleted = true;
    this.updatedOn = new Date();
    return this.save() as Promise<IUser>;
};

export const UserModel = model<IUser>("user", UserSchema);
