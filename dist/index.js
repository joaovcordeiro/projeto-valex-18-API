import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import chalk from "chalk";
import router from "./routers/index.js";
dotenv.config();
var app = express();
app.use(json());
app.use(cors());
app.use(router);
var port = +process.env.PORT || 5000; // + converts string to number
app.listen(port, function () {
    console.log(chalk.green("Server started on port ".concat(port)));
});
