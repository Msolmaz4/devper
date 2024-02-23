"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()


/* ------------------------------------------------------- */

require("dotenv").config()
const PORT = process.env.PORT || 8000
require("express-async-errors")
// continue from here...

const {dbConnection} = require("./src/configs/dbConnection")
dbConnection()
/* ------------------------------------------------------- */

app.all("/",(req,res)=>{
    res.send({
        error:false,
        message:"hata weg"
    })
})

app.use(express.json())
app.use(require("cookie-session")({secret:process.env.SECRET_KEY}))

app.use(require('./src/middlewares/findSearchSortPage'))

// Login/Logout Control Middleware
// app.use(async (req, res, next) => {

//     const Personnel = require('./src/models/personnel.model')

//     req.isLogin = false

//     if (req.session?.id) {

//         const user = await Personnel.findOne({ _id: req.session.id })

//         // if (user && user.password == req.session.password) {
//         //     req.isLogin = true
//         // }
//         req.isLogin = user && user.password == req.session.password
//     }
//     console.log('isLogin: ', req.isLogin)

//     next()
// })
app.use(require("./src/middlewares/authentication"))
app.use("/departments",require("./src/routes/department.router"))
app.use("/personnels",require("./src/routes/personnel.router"))
app.use("/tokens",require("./src/routes/token.router"))

app.use("/auth",require("./src/routes/auth.router"))


// //log  render de iyin vermiyor
// const morgan = require("morgan")
// //app.use(morgan("tiny"))
// //log kayit tutma
// const fs = require('node:fs')//file system
// const now = new Date()
// const today = now.toISOString().split('T')[0]
// app.use(morgan('combined', {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// }))
//npm i swagger-ui-express
const swaggerUi= require("swagger-ui-express")
const swaggerJson = require("./swagger.json")

app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))
//redoc npm i redoc-express
const redoc = require('redoc-express')
app.use('/docs/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})
app.use('/docs/redoc', redoc({
    specUrl: '/docs/json',
    title: 'API Docs',
}))
// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))


/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
//require('./src/helpers/sync')()