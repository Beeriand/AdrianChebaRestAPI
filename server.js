const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");


const port = process.env.PORT || 3000

const options ={
    definition: {
        openapi: "3.0.3",
    info:{
        title: "RestAPI",
        version: "1.1",
        description: " Testowe API "
    },
    servers:[
    {
        servers:["http://localhost:" + port]
    }
    ],
},
    apis:["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

mongoose.connect("mongodb+srv://Beeriand:adizaq145236!@Cluster0.qmjsd.mongodb.net/Claster0?retryWrites=true&w=majority", {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (error)=> console.error(error));
db.once("open", ()=>console.log("Connected with Database"));


app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));

const employeesRouter = require("./routes/employees");
app.use("/employees", employeesRouter);

app.listen(port, () => console.log("Server Started"));

