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

    schema.pre("find", function (next) {
        void this.where({ isDeleted: false });
        next();
    });

    schema.pre("findOne", function (next) {
        void this.where({ isDeleted: false });
        next();
    });

    schema.pre("countDocuments", function (next) {
        void this.where({ isDeleted: false });
        next();
    });

    schema.methods.softDelete = async function (): Promise<void> {
        this.isDeleted = true;
        this.updatedOn = new Date();
        await this.save();
    };
};

export const TimeLine = (schema: Schema): void => {
    schema.add({
        createdOn: {
            type: Date,
            default: new Date(),
            required: true,
        },
        updatedOn: {
            type: Date,
        },
    });
};
