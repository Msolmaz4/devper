"use strict"

const swaggerAutogen = require("swagger-autogen")
const packageJson = require("./package.json")

//npm i swagger-autogen
require("dotenv").config()
const PORT = process.env?.PORT || 8000
const HOST = process.env.HOST || "127.0.0.1"
const document={
    info: {
    // version: "1.0.0",
     version: packageJson.version,

     //title: "Personnel API",
     title: packageJson.title,
     description: "Personnel Management API Service",
     termsOfService: "http://www.clarusway.com",
     contact: { name: "Clarusway", email: "qadir@clarusway.com" },
     license: { name: "BSD License", },
    },
    host :`${HOST}: ${PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],
    // JWT Settings:
//     securityDefinitions: {
//         JWT: {
//             type: 'apiKey',
//             in: 'header',
//             name: 'Authorization',
//             description: 'Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>'
//         }
//     },
//     security: [{ "JWT": true }],
    //cikmayabn olursa burdan tanimlariy
     definition:{
        //  "Department":{
        //     "name":"ObjectId",
        //      require :true
        //  }
        "Department": require('./src/models/department.model').schema.obj,
        "Personnel": require('./src/models/personnel.model').schema.obj,
     }
}
const routes = [ "./index.js"]
const outputfile = "swagger.json"

//create json file
swaggerAutogen(outputfile,routes,document)
//node swagger.js