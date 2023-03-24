import { generateCoverLetter } from "./services/openai";
import { parsePdf } from "./services/parsePdf";

exports.handler = async (event: { body: string; }, _: any) => {
    let response;
    try {
        console.log('event', event);
        const body = JSON.parse(event.body);
        const { jobDescription } = body;
        console.log('body', body);
        
        // if no prompt provided, parse pdf
        const prompt = body.prompt || await parsePdf();
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
