import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface ILogoutService
    extends IService<
        ILogoutServiceRequest,
        ILogoutServiceResponse,
        ILogoutServiceDataResponseData
    > {}

export interface ILogoutServiceRequest extends IServiceRequest {}

export interface ILogoutServiceResponse extends IServiceResponse<ILogoutServiceDataResponseData> {}

export interface ILogoutServiceDataResponseData {
    UserInfo: IUsersInfo[];
}

export interface IUsersInfo {
    Id: string;
    Name: string;
    Email: string;
    Role: number;
    CreatedOn: Date;
}
