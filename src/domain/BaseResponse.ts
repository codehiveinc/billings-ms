export interface BaseResponse<T> {
    data : T | null;
    message : string;
    success : boolean;
    statusCode : number;
}