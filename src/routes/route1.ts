import express from "express";
const router = express.Router();
import { generateCoverLetter } from "../services/openai";
import { GRAMMARLY_JD } from "../Constants";

router.get('/generate-cover-letter', async (_, res) => {
    const prompt = "I have 5 years of experience with web development and am familiar with popular frameworks like react, angular, node and many more. I also have experience with end-to-end testing and telemetry"
    const response = await generateCoverLetter(GRAMMARLY_JD, prompt)
    console.log(response.data.usage)
    res.send(response.data.choices[0].message.content);
});

export default router;