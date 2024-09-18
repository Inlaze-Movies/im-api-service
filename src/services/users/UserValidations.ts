import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type { IUser } from "src/Schema/user.schema";

export class UserValidations {
    public constructor(@InjectModel("user") private readonly userModel: Model<IUser>) {}

    public EmailExistsAsync = async (email: string): Promise<boolean> => {
        const user = await this.userModel.findOne({ email });
        return !!user;
    };

    public EmailIsValid = async (email: string): Promise<string[]> => {
        const errors: string[] = [];
        if (!email) {
            errors.push("Email is required");
        }
        if (email && !email.includes("@")) {
            errors.push("Email required a valid format, missing @");
        }
        if (email && !email.includes(".")) {
            errors.push("Email required a valid format, missing .");
        }
        if (email.length < 5) {
            errors.push("Email must be at least 5 characters");
        }
        if (email && (await this.EmailExistsAsync(email))) {
            errors.push("Email already exists");
        }
        if (errors.length === 0) {
            return [];
        }
        return errors;
    };

    public PasswordIsValid = (password: string): string[] => {
        const errors: string[] = [];
        if (!password) {
            errors.push("Password is required");
        }
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters");
        }
        if (!RegExp(/[A-Z]/).exec(password)) {
            errors.push("Password must contain an uppercase letter");
        }
        if (!RegExp(/[a-z]/).exec(password)) {
            errors.push("Password must contain a lowercase letter");
        }
        if (!RegExp(/[!@#$%^&*]/).exec(password)) {
            errors.push("Password must contain a special character");
        }
        if (!RegExp(/\d/).exec(password)) {
            errors.push("Password must contain a number");
        }
        if (RegExp(/\s/).exec(password)) {
            errors.push("Password must not contain whitespace");
        }
        return errors;
    };

    private containsNumber(password: string): boolean {
        return /\d/.test(password);
    }
}
