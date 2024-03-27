import { Configuration, OpenAIApi } from "openai";
import Constants from "../Constants";
const { GPT_MODEL, SYSTEM_PROMPT, SAMPLE_COVER_LETTER } = Constants;

const buildOpenAi = async() => {
    const apiKey: string = process.env.OPENAI_API_KEY ?? "";
    const configuration = new Configuration({
        apiKey,
    });
    const openai = new OpenAIApi(configuration);
    return openai;
}

export const generateCoverLetter = async (jobDescription: string, prompt: string) => {
    const openai = await buildOpenAi();
    try {
        const completion = await openai.createChatCompletion({
            model: GPT_MODEL,
            temperature: 0.1,
            presence_penalty: 1,
            messages: [
                {
                    role: "system", content: SYSTEM_PROMPT
                },
                {
                    role: "user", content: `This is the job description of the job that I want: ${jobDescription}\nI want a cover letter that has a similar voice to this one: ${SAMPLE_COVER_LETTER}`
                },
                {
                    role: "user", content: prompt
                }
            ]
        });
        return completion?.data?.choices[0]?.message?.content;
    } catch (err) {
        console.log('Error generating cover letter: ', err);
        const msg = err.response.data.error.message
        throw new Error(msg)
    }
};

