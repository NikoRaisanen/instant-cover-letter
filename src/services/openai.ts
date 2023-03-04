import { Configuration, OpenAIApi } from "openai";

const buildOpenAi = async() => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    return openai;
    // const response = await openai.retrieveModel(GPT_MODEL);
    // console.log(response.data)
}

module.exports = { buildOpenAi };