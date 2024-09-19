import { Schema, model } from "mongoose";
import type { Document, ObjectId } from "mongoose";
import { SoftDelete } from "src/services/SoftDelete";

export interface IUser extends Document {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: number;
    isDeleted: boolean;
    createdOn: Date;
    updatedOn?: Date;
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
        type: Number,
        required: true,
    },
});

UserSchema.plugin(SoftDelete);

export const UserModel = model<IUser>("user", UserSchema);
