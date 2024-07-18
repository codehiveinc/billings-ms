import { BaseResponse } from '../domain/BaseResponse';

export function createResponse<T>(
  data: T | null,
  message: string,
  success: boolean,
  statusCode: number
): BaseResponse<T> {
  return {
    data,
    message,
    success,
    statusCode,
  };
}
