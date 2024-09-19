import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Model } from "mongoose";
import type {
    ICreateUserService,
    ICreateUserServiceRequest,
    ICreateUserServiceResponse,
    ICreateUserServiceDataResponseData,
} from "src/core/auth/ICreateUserService";
import type { IUser } from "src/Schema/user.schema";
import { UserValidations } from "src/services/users/UserValidations";

@Injectable()
export class CreateUserService implements ICreateUserService {
    public constructor(
        @InjectModel("user") private readonly userModel: Model<IUser>,
        private readonly userValidations: UserValidations,
    ) {}

    public ExecuteAsync = async (
        request: ICreateUserServiceRequest,
    ): Promise<ICreateUserServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new CreateUserServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }
        let role;
        if (request.Role) {
            role = request.Role;
        } else {
            role = 1;
        }

        const user = new this.userModel({
            name: request.Name,
            email: request.Email,
            password: request.Password,
            role: role,
            createdOn: new Date(),
        });

        await user.save();

        return new CreateUserServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: ICreateUserServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const emailErrors: string[] = await this.userValidations.EmailIsValidAsync(request.Email);
        const passwordErrors: string[] = this.userValidations.PasswordIsValid(request.Password);

        if (request.Email && (await this.userValidations.EmailExistsAsync(request.Email))) {
            errors.push("Email already exists");
        }

        if (passwordErrors.length > 0) {
            errors.push(...passwordErrors);
        }
        if (emailErrors.length > 0) {
            errors.push(...emailErrors);
        }
        if (!request.Email) {
            errors.push("Email is required");
        }
        if (!request.Password) {
            errors.push("Password is required");
        }
        return errors;
    };
}

export class CreateUserServiceRequest implements ICreateUserServiceRequest {
    @ApiProperty()
    public Name!: string;
    @ApiProperty()
    public Email!: string;
    @ApiProperty()
    public Password!: string;
    @ApiProperty({ required: false })
    public Role?: number;
}

export class CreateUserServiceDataResponseData implements ICreateUserServiceDataResponseData {
    public Message!: string;
}

export class CreateUserServiceResponse implements ICreateUserServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: CreateUserServiceDataResponseData;

    public constructor(data: ICreateUserServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
