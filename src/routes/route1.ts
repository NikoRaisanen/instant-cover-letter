import express from "express";
const router = express.Router();

router.get('/route1', (_, res) => {
    res.send('Hey you hit route1!');
});

export default router;