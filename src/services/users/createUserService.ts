import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type {
    ICreateUserService,
    ICreateUserServiceRequest,
    ICreateUserServiceResponse,
    ICreateUserServiceDataResponseData,
} from "src/core/auth/icreateUserService";
import type { IUser } from "src/core/Ischema/user.schema";

@Injectable()
export class CreateUserService implements ICreateUserService {
    private constructor(@InjectModel("user") private readonly userModel: Model<IUser>) {}

    public ExecuteAsync = async (
        request: ICreateUserServiceRequest,
    ): Promise<ICreateUserServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new CreateUserServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
                Data: null,
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
        });

        await user.save();

        return new CreateUserServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
            Data: undefined,
        });
    };

    public ValidateAsync = async (request: CreateUserServiceRequest): Promise<string[]> => {
        const errors: string[] = [];
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
    public Name: string;
    public Email: string;
    public Password: string;
    public Role: number | null | undefined;

    public constructor(data: ICreateUserServiceRequest) {
        this.Name = data.Name;
        this.Email = data.Email;
        this.Password = data.Password;
        this.Role = data.Role;
    }
}

export class CreateUserServiceResponse implements ICreateUserServiceResponse {
    public Message: string | null | undefined;
    public Errors: string[] | null | undefined;
    public Success: boolean;
    public Data: CreateUserServiceDataResponseData | null | undefined;

    public constructor(data: ICreateUserServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}

export class CreateUserServiceDataResponseData implements ICreateUserServiceDataResponseData {
    public Message: string;

    public constructor(message: string) {
        this.Message = message;
    }
}
