import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiProperty } from "@nestjs/swagger";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type {
    ILoginService,
    ILoginServiceRequest,
    ILoginServiceResponse,
    ILoginServiceDataResponseData,
} from "src/core/auth/ILoginService";
import type { IUser } from "src/Schema/user.schema";
import { UserValidations } from "src/services/users/UserValidations";

@Injectable()
export class LoginService implements ILoginService {
    public constructor(
        @InjectModel("user") private readonly userModel: Model<IUser>,
        private readonly userValidations: UserValidations,
        private readonly jwtService: JwtService,
    ) {}

    public ExecuteAsync = async (request: ILoginServiceRequest): Promise<ILoginServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new LoginServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const user = await this.userModel.findOne({ email: request.Email });

        if (user!.password !== request.Password) {
            throw new UnauthorizedException("Invalid password");
        }

        const payload = { sub: user!.id, username: user!.email };
        const token = this.jwtService.signAsync(payload);

        return new LoginServiceResponse({
            Message: "Login Successful",
            Errors: undefined,
            Success: true,
            Data: new LoginServiceDataResponseData({
                Token: (await token).toString(),
                ExpiresIn: 3600,
                TokenType: "Bearer",
            }),
        });
    };

    public ValidateAsync = async (request: ILoginServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const emailErrors: string[] = await this.userValidations.EmailIsValidAsync(request.Email);
        const passwordErrors: string[] = this.userValidations.PasswordIsValid(request.Password);

        if (emailErrors.length > 0) {
            errors.push(...emailErrors);
        }
        if (passwordErrors.length > 0) {
            errors.push(...passwordErrors);
        }

        return errors;
    };
}

export class LoginServiceRequest implements ILoginServiceRequest {
    @ApiProperty()
    public Email!: string;
    @ApiProperty()
    public Password!: string;
}

export class LoginServiceDataResponseData implements ILoginServiceDataResponseData {
    public Token!: string;
    public ExpiresIn!: number;
    public TokenType!: string;

    public constructor(data: { Token: string; ExpiresIn: number; TokenType: string }) {
        this.Token = data.Token;
        this.ExpiresIn = data.ExpiresIn;
        this.TokenType = data.TokenType;
    }
}

export class LoginServiceResponse implements ILoginServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: LoginServiceDataResponseData;

    public constructor(data: ILoginServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
