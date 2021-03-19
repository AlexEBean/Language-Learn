const bcrypt = require("bcrypt")

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, password} = req.body
        try {
            const existingUsername = await db.auth.check_username(username)
            const existingEmail = await db.auth.check_email(email)

            if (existingUsername[0]) {
                return res.status(409).send("User already exists with that username")
            }
            if (existingEmail[0]) {
            return res.status(409).send("User already exists with that email")
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            req.body.password = hash

            req.body.profile_pic = `https://avatars.dicebear.com/api/identicon/${username}.svg`
            req.body.region = "Northern"
            const [newUser] = await db.auth.register_user(req.body)
            await db.auth.register_critterpedia(newUser.user_id)
                    
            req.session.user = newUser
            res.status(200).send(req.session.user) 
        } catch (err) {
            res.sendStatus(400)
            console.log("Database error on register function", err)
        }
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        try {
            const [foundUser] = await db.auth.check_username(username)
            if(!foundUser){
                return res.status(401).send("Incorrect login information")
            }
            const authenticated = bcrypt.compareSync(password, foundUser.password)
            if (authenticated) {
                req.session.user = foundUser
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send('Incorrect login information')
            }
        } catch(err) {
            res.sendStatus(400)
            console.log("Database error on login function", err)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
}