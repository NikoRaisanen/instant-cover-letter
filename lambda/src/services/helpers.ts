import type { APIGatewayProxyResult } from "aws-lambda";

export const generateResponse = (statusCode: number, body: string): APIGatewayProxyResult => {
    const response = {
        statusCode,
        body,
    };
    return response
}