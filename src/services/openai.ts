import { Configuration, OpenAIApi } from "openai";
import { GPT_MODEL, SYSTEM_PROMPT } from "../Constants";

const buildOpenAi = async() => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    return openai;
}

const generateCoverLetter = async (jobDescription: string, prompt: string) => {
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
    return completion
}

module.exports = {
    buildOpenAi,
    generateCoverLetter,
};