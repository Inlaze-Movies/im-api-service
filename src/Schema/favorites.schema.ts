import { Schema, model } from "mongoose";
import type { Document, ObjectId } from "mongoose";
import { TimeLine } from "src/services/SoftDelete";

export interface IFavorite extends Document {
    id: ObjectId;
    movieId: string;
    originalTitle: string;
    isFavorite: boolean;
    createdOn: Date;
    updatedOn?: Date;
}

export const FavoriteSchema = new Schema({
    movieId: {
        type: Number,
        required: true,
    },
    originalTitle: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

FavoriteSchema.plugin(TimeLine);

export const UserModel = model<IFavorite>("favorite", FavoriteSchema);
