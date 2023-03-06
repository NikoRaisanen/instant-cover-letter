import { generateCoverLetter } from "./services/openai";

exports.handler = async (event: { body: string; }, _: any) => {
    const body = JSON.parse(event.body);
    const {prompt, jobDescription } = body;

    const res = await generateCoverLetter(jobDescription, prompt);
    const coverLetter = res?.data?.choices[0]?.message?.content;
    
    if (!coverLetter) {
        throw Error("No choices returned from OpenAI");
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            coverLetter,
        }),
    };
    return response;
};
