import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IAddFavoriteMoviesService
    extends IService<
        IAddFavoriteMoviesServiceRequest,
        IAddFavoriteMoviesServiceResponse,
        IAddFavoriteMoviesServiceDataResponseData
    > {}

export interface IAddFavoriteMoviesServiceRequest extends IServiceRequest {
    Name: string;
    Email: string;
    Password: string;
    Role?: number;
}

export interface IAddFavoriteMoviesServiceResponse
    extends IServiceResponse<IAddFavoriteMoviesServiceDataResponseData> {}

export interface IAddFavoriteMoviesServiceDataResponseData {
    Message: string;
}
