import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IAddFavoriteMoviesService
    extends IService<
        IAddFavoriteMoviesServiceRequest,
        IAddFavoriteMoviesServiceResponse,
        IAddFavoriteMoviesServiceDataResponseData
    > {}

export interface IAddFavoriteMoviesServiceRequest extends IServiceRequest {
    MovieId: number;
    OriginalTitle: string;
    UserId: string;
}

export interface IAddFavoriteMoviesServiceResponse
    extends IServiceResponse<IAddFavoriteMoviesServiceDataResponseData> {}

export interface IAddFavoriteMoviesServiceDataResponseData {}
