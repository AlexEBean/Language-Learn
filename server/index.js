require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require("./controllers/authController")
const userCtrl = require("./controllers/userController")
const cpCtrl = require("./controllers/critterpediaController")
const picCtrl = require("./controllers/picController")

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

const path = require('path')

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(database => {
    app.set("db", database)
    console.log("Connected to DB")
})


app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)

app.get("/api/user", userCtrl.refresh)
app.put("/api/user", userCtrl.editUser)
app.delete("/api/user", userCtrl.deleteUser)
app.post("/api/user/forgotpassword", userCtrl.forgotPassword)
app.put("/api/user/resetpassword/:passwordToken", userCtrl.resetPassword)
app.put("/api/user/changepassword", userCtrl.changePass)

app.get("/api/critterpedia", cpCtrl.getCritterpedia)
app.put("/api/critterpedia", cpCtrl.updateCritterpedia)

app.get("/api/pic/:user_id", picCtrl.getProfilePic)
app.get("/api/signs3", checkUser, picCtrl.config)
app.post("/api/signs3", checkUser, picCtrl.deleteProfilePic)
app.put("/api/user", checkUser, picCtrl.updateProfilePic)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`))