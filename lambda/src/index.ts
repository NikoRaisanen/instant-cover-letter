import { generateCoverLetter } from "./services/openai";
import Constants from "./Constants";
const { GRAMMARLY_JD } = Constants;

exports.handler = async (event: { body: string; }, _: any) => {
    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    const res = await generateCoverLetter(GRAMMARLY_JD, prompt);
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
