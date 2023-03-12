import { generateCoverLetter } from "./services/openai";
import { getContent } from "./services/pdf";

exports.handler = async (event: { body: string; }, _: any) => {
    let response;
    try {
        const body = JSON.parse(event.body);
        const { jobDescription } = body;
        console.log('body', body);
        const prompt = body.prompt || await getContent(body.resumeUrl);
        console.info("prompt:", prompt)
        const coverLetter = await generateCoverLetter(jobDescription, prompt);
        if (!coverLetter) {
            throw new Error("ChatGPT could not create a cover letter from the provided information");
        }
        
        response = {
            statusCode: 200,
            body: JSON.stringify({
                coverLetter,
            }),
        };

    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message,
            }),
        };
    }
    
    return response;
};
