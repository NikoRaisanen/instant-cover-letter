import { generateCoverLetter } from "./services/openai";
import { parsePdf } from "./services/parsePdf";
import { handlePresigned } from "./services/helpers";
import { generateResponse } from "./services/helpers";

// TODO: look into lambda function urls to bypass 30s api gateway timeout
// https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html

type AwsEvent = {
    requestContext: {
        http: {
            method: string,
            path: string,
        }
    },
    queryStringParameters: {
        filename: string,
    },
    body: string,
    isBase64Encoded: boolean,
}

exports.handler = async (event: AwsEvent) => {
    if (event.isBase64Encoded) {
        event.body = Buffer.from(event.body, 'base64').toString('utf-8');
    }

    let response;
    try {
        console.info('invoked presigned-url route');
        const { method, path } = event.requestContext.http;
        if (method === 'GET' && path === '/presigned-url') {
            const { filename } = event.queryStringParameters;
            const res = await handlePresigned(filename);
            return generateResponse(200, JSON.stringify(res));
        }

        console.log('invoked /sorcery route')
        const body = JSON.parse(event.body);
        const { jobDescription } = body;

        let prompt: string;
        if (body.resumeS3Key) {
            try {
                prompt = await parsePdf(body.resumeS3Key);
            } catch (err) {
                console.error(`Error parsing ${body.resumeS3Key}: ${err}`);
                throw new Error('Error parsing pdf. This is a beta feature, make sure that the file is not corrupt and try again');
            }
        } else {
            prompt = body.prompt
        }

        const coverLetter = await generateCoverLetter(jobDescription, prompt);
        if (!coverLetter) {
            console.error('no cover letter generated for prompt: ', prompt)
            throw new Error("ChatGPT could not create a cover letter from the provided information");
        }
        response = generateResponse(200, JSON.stringify({ coverLetter })); 

    } catch (err) {
        response = generateResponse(500, JSON.stringify({ error: err.message }));
    }

    return response;
};
