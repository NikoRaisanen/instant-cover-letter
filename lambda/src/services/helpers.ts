import type { APIGatewayProxyResult } from "aws-lambda";

export const generateResponse = (statusCode: number, body: string): APIGatewayProxyResult => {
    const response = {
        statusCode,
        body,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        }
    };
    return response
}