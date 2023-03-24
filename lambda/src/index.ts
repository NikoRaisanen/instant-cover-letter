// import { generateCoverLetter } from "./services/openai";
import { parsePdf } from "./services/parsePdf";

// TODO: look into this https://haydnjmorris.medium.com/aws-lambda-node-modules-no-docker-required-76443a0f6c4e
// I am having an issue with doing npm install locally on windows, then trying to use those node_modules in a lambda
exports.handler = async (event: { body: string; }, _: any) => {
    console.log('I AM IN THE INDEX FILE!!!')
    let response;
    try {
        console.log('event', event);
        // const body = JSON.parse(event.body);
        // const { jobDescription } = body;
        // console.log('body', body);
        // const prompt = body.prompt;
        // console.info("prompt:", prompt)
        // test pdf parsing in lambda
        const resumeText = await parsePdf();
        console.log('Resume text in main handler: ', resumeText);
        // const coverLetter = await generateCoverLetter(jobDescription, prompt);
        // if (!coverLetter) {
        //     throw new Error("ChatGPT could not create a cover letter from the provided information");
        // }
        
        const coverLetter = 'This is a cover letter'
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
