import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface ILoginService
    extends IService<ILoginServiceRequest, ILoginServiceResponse, ILoginServiceDataResponseData> {}

export interface ILoginServiceRequest extends IServiceRequest {
    Email: string;
    Password: string;
}

export interface ILoginServiceResponse extends IServiceResponse<ILoginServiceDataResponseData> {}

export interface ILoginServiceDataResponseData {
    Token: string;
    ExpiresIn: number;
    TokenType: string;
}
