import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IGetUserByIdService
    extends IService<
        IGetUserByIdServiceRequest,
        IGetUserByIdServiceResponse,
        IGetUserByIdServiceDataResponseData
    > {}

export interface IGetUserByIdServiceRequest extends IServiceRequest {
    Id: string;
}

export interface IGetUserByIdServiceResponse
    extends IServiceResponse<IGetUserByIdServiceDataResponseData> {}

export interface IGetUserByIdServiceDataResponseData {
    UserInfo: IUserInfo[];
}

export interface IUserInfo {
    Id: string;
    Name: string;
    Email: string;
    Role: number;
    CreatedOn: Date;
}
