import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IUpdateUserService
    extends IService<
        IUpdateUserServiceRequest,
        IUpdateUserServiceResponse,
        IUpdateUserServiceDataResponseData
    > {}

export interface IUpdateUserServiceRequest extends IServiceRequest {
    Name: string;
    Email: string;
    Role: number;
}

export interface IUpdateUserServiceResponse
    extends IServiceResponse<IUpdateUserServiceDataResponseData> {}

export interface IUpdateUserServiceDataResponseData {}
