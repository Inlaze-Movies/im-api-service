import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Model } from "mongoose";
import type {
    IUpdateUserService,
    IUpdateUserServiceRequest,
    IUpdateUserServiceResponse,
    IUpdateUserServiceDataResponseData,
} from "src/core/users/IUpdateUserService";
import type { IUser } from "src/Schema/user.schema";
import { UserValidations } from "src/services/users/UserValidations";

@Injectable()
export class UpdateUserService implements IUpdateUserService {
    public constructor(
        @InjectModel("user") private readonly userModel: Model<IUser>,
        private readonly userValidations: UserValidations,
    ) {}

    public ExecuteAsync = async (
        request: IUpdateUserServiceRequest,
    ): Promise<IUpdateUserServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new UpdateUserServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const user = await this.userModel.findOne({ email: request.Email });

        user!.name = request.Name;
        user!.role = request.Role;
        user!.updatedOn = new Date();

        await user!.save();

        return new UpdateUserServiceResponse({
            Message: "User information updated",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: IUpdateUserServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const emailErrors: string[] = await this.userValidations.EmailIsValidAsync(request.Email);

        if (emailErrors.length > 0) {
            errors.push(...emailErrors);
        }
        if (!request.Email) {
            errors.push("Email is required");
        }
        if (!request.Name) {
            errors.push("Name is required");
        }

        return errors;
    };
}

export class UpdateUserServiceRequest implements IUpdateUserServiceRequest {
    @ApiProperty()
    public Name!: string;
    @ApiProperty()
    public Email!: string;
    @ApiProperty()
    public Role!: number;
}

export class UpdateUserServiceDataResponseData implements IUpdateUserServiceDataResponseData {}

export class UpdateUserServiceResponse implements IUpdateUserServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: UpdateUserServiceDataResponseData;

    public constructor(data: IUpdateUserServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
    }
}
