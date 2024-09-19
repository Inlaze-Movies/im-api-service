import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Model } from "mongoose";
import type {
    IGetUserByIdService,
    IGetUserByIdServiceRequest,
    IGetUserByIdServiceResponse,
    IGetUserByIdServiceDataResponseData,
    IUserInfo,
} from "src/core/users/IGetUserByIdService";
import type { IUser } from "src/Schema/user.schema";
import { UserValidations } from "src/services/users/UserValidations";

@Injectable()
export class GetUserByIdService implements IGetUserByIdService {
    public constructor(
        @InjectModel("user") private readonly userModel: Model<IUser>,
        private readonly userValidations: UserValidations,
    ) {}

    public ExecuteAsync = async (
        request: IGetUserByIdServiceRequest,
    ): Promise<IGetUserByIdServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new GetUserByIdServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const user = await this.userModel.findById(request.Id);

        const userInfo: IUserInfo[] = [
            {
                Id: user!.id.toString(),
                Name: user!.name,
                Email: user!.email,
                Role: user!.role,
                CreatedOn: user!.createdOn,
            },
        ];

        return new GetUserByIdServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
            Data: { UserInfo: userInfo },
        });
    };

    public ValidateAsync = async (request: IGetUserByIdServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const user = await this.userModel.findById(request.Id);

        if (!user) {
            errors.push("User not found");
        }

        if (!request.Id) {
            errors.push("Id is required");
        }

        return errors;
    };
}

export class GetUserByIdServiceRequest implements IGetUserByIdServiceRequest {
    @ApiProperty()
    public Id!: string;
}

export class GetUserByIdServiceDataResponseData implements IGetUserByIdServiceDataResponseData {
    public UserInfo!: IUserInfo[];
}

export class GetUserByIdServiceResponse implements IGetUserByIdServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: GetUserByIdServiceDataResponseData;

    public constructor(data: IGetUserByIdServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
