"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const route1_1 = __importDefault(require("./routes/route1"));
// app.get('/', (_, res) => {
//     res.send('Hello this is the main route!');
// })
app.use('/', route1_1.default);
app.get('/test', (_, res) => {
    res.send('yoyo test route');
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}`));
