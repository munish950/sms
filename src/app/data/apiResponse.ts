export interface ApiResponse<T> {
    apiMessage: string;
    statusCode: number;
    success: boolean;
    data: T;
}