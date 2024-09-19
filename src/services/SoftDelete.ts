import type { Schema } from "mongoose";

export const SoftDelete = (schema: Schema): void => {
    schema.add({
        isDeleted: {
            type: Boolean,
            default: false,
            required: true,
        },
        createdOn: {
            type: Date,
            default: new Date(),
            required: true,
        },
        updatedOn: {
            type: Date,
        },
    });

    schema.pre("find", async function (next) {
        await this.where({ isDeleted: false });
        next();
    });

    schema.pre("findOne", async function (next) {
        await this.where({ isDeleted: false });
        next();
    });

    schema.pre("countDocuments", async function (next) {
        await this.where({ isDeleted: false });
        next();
    });

    schema.methods.softDelete = async function (): Promise<void> {
        this.isDeleted = true;
        this.updatedOn = new Date();
        await this.save();
    };
};
