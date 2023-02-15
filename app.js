const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config()
require('./db/conn');

const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ----- router ----- //
const authRouter = require("./router/auth.router");
app.use("/auth",authRouter);

app.listen(port, () => {
    console.log("=========================================================================");
    console.log(`Server Running At :- ${port}`);
})