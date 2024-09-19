import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface ICreateUserService
    extends IService<
        ICreateUserServiceRequest,
        ICreateUserServiceResponse,
        ICreateUserServiceDataResponseData
    > {}

export interface ICreateUserServiceRequest extends IServiceRequest {
    Name: string;
    Email: string;
    Password: string;
    Role?: number;
}

export interface ICreateUserServiceResponse
    extends IServiceResponse<ICreateUserServiceDataResponseData> {}

export interface ICreateUserServiceDataResponseData {
    Message: string;
}
