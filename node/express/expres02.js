const http = require("http");
const express = require("express");

const app = express();
const testRouter = require("./test_router.js");

app.get("/", (req,res) => {
    res.status(200).send("Hello Woasdasdr!");

});

app.use("/test", testRouter);

app.listen(8080, ()=>{console.log("Server started");
});