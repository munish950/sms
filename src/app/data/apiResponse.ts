import { User } from "./user";

export interface ApiResponse<T> {
    apiMessage: string;
    statusCode: number;
    success: boolean;
    data: T;
}