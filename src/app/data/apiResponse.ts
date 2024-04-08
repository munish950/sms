export interface ApiResponse {
    apiMessage: string;
    statusCode: number;
    success: boolean;
    data: [];
}

export function isAPiResponse(body: any): body is ApiResponse {
    return (
        typeof body === 'object' &&
        'apiMessage' in body &&
        'statusCode' in body &&
        'success' in body &&
        'data' in body
    );
}