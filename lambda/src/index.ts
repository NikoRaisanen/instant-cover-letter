import { generateCoverLetter } from "./services/openai";
import { parsePdf } from "./services/parsePdf";
import { handlePresigned } from "./services/handlePresigned";
import { generateResponse } from "./services/helpers";

// TODO: look into lambda function urls to bypass 30s api gateway timeout
// https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html'

type AwsEvent = {
    body: string,
    requestContext: {
        http: {
            method: string,
            path: string,
        }
    }
}

// presigned url payload looks like: event.body.filename
exports.handler = async (event: AwsEvent) => {
    // event.body should have 1 of these 2 keys:
    // 1. prompt: string
    // 2. resumeS3Key: string
    // presigned url
    let response;
    try {
        const body = JSON.parse(event.body);
        console.log('body', body);
        console.log('event', event);

        // if presigned-url route
        const { method, path } = event.requestContext.http;
        if (method === 'GET' && path === '/presigned-url') {
            const res = await handlePresigned(body.filename);
            return generateResponse(200, JSON.stringify(res));
        }

        const { jobDescription } = body;
        // if no prompt provided, parse pdf
        const prompt = body.prompt || await parsePdf('file with spaces and parentheses ().pdf');
        console.info("prompt:", prompt)
        const coverLetter = await generateCoverLetter(jobDescription, prompt);
        if (!coverLetter) {
            throw new Error("ChatGPT could not create a cover letter from the provided information");
        }
        response = generateResponse(200, JSON.stringify({ coverLetter })); 

    } catch (err) {
        response = generateResponse(500, JSON.stringify({ error: err.message }));
    }
    
    return response;
};
