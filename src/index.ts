import express from "express";
const app = express();
import route1 from "./routes/route1";


// app.get('/', (_, res) => {
//     res.send('Hello this is the main route!');
// })

app.use('/', route1);

app.get('/test', (_, res) => {
    res.send('yoyo test route');
})

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on PORT ${port}`));