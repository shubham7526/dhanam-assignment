const express = require('express');
const app = express();

const port = 4042;
require('./models/index');

app.use(express.json());

const { signUp } = require("./controllers/sign-up");

app.post("/signup", signUp);

app.listen(port, ()=>{
    console.log(`App is listening at http://localhost:${port}`);
});