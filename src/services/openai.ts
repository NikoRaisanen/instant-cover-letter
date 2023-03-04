import { Configuration, OpenAIApi } from "openai";
import Constants from "../Constants";
const { GPT_MODEL, SYSTEM_PROMPT } = Constants;

const buildOpenAi = async() => {
    const apiKey: string = process.env.OPENAI_API_KEY ?? "";
    console.log(`apiKey: ${apiKey}`);
    console.log(typeof apiKey);
    const configuration = new Configuration({
        apiKey,
    });
    const openai = new OpenAIApi(configuration);
    return openai;
}

export const generateCoverLetter = async (jobDescription: string, prompt: string) => {
    const openai = await buildOpenAi();
    const completion = await openai.createChatCompletion({
        model: GPT_MODEL,
        temperature: 0.3,
        messages: [
            {
                role: "system", content: SYSTEM_PROMPT
            },
            {
                role: "user", content: `This is the job description of the job that I want: ${jobDescription}`
            },
            {
                role: "user", content: prompt
            }
        ]
    });
    return completion;
}
