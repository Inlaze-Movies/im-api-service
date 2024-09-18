import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IGetAllUserService
    extends IService<
        IGetAllUserServiceRequest,
        IGetAllUserServiceResponse,
        IGetAllUserServiceDataResponseData
    > {}

export interface IGetAllUserServiceRequest extends IServiceRequest {}

export interface IGetAllUserServiceResponse
    extends IServiceResponse<IGetAllUserServiceDataResponseData> {}

export interface IGetAllUserServiceDataResponseData {
    UserInfo: IUsersInfo[];
}

export interface IUsersInfo {
    Name: string;
    Email: string;
    Role: number;
    CreatedOn: Date;
}
