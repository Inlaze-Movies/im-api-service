import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IGetAllFavoriteMoviesService
    extends IService<
        IGetAllFavoriteMoviesServiceRequest,
        IGetAllFavoriteMoviesServiceResponse,
        IGetAllFavoriteMoviesServiceDataResponseData
    > {}

export interface IGetAllFavoriteMoviesServiceRequest extends IServiceRequest {
    UserId: string;
}

export interface IGetAllFavoriteMoviesServiceResponse
    extends IServiceResponse<IGetAllFavoriteMoviesServiceDataResponseData> {}

export interface IGetAllFavoriteMoviesServiceDataResponseData {
    FavoriteList: IFavoriteInfo[];
}

export interface IFavoriteInfo {
    Id: string;
    MovieId: number;
    OriginTitle: string;
    UserId: string;
    CreatedOn: Date;
    UpdatedOn: Date;
}
