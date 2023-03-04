import express from "express";
const router = express.Router();
import { buildOpenAi } from "../services/openai";
import Constants from "../Constants";

router.get('/route1', async (_, res) => {
    console.log('route 1 log');
    console.log(Constants)
    const openai = await buildOpenAi();
    const response = await openai.createChatCompletion({
        model: Constants.GPT_MODEL,
        temperature: 0.3,
        messages: [{role: "user", content: "Write 2 paragraphs of a cover letter for a software engineer with 3 years of experience who has security experience and wants to work on ai projects"}]
    })
    console.log(response.data.choices)
    console.log(response.usage);
    console.log(response.data.usage)
    res.send('Hey you hit route1!');
});

export default router;