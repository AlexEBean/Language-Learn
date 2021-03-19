const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const crypto = require('crypto')

module.exports = {
    refresh: async (req, res) => {
        if (req.session.user){
           try{
                const {user_id} = req.session.user    
                const db = req.app.get('db')
                const [user] = await db.user.refresh_user(+user_id)
                res.status(200).send(user)
           }  catch(err) {
                console.log("Error in refreshing", err)
                res.sendStatus(500)
            }
        }  else {
            res.sendStatus(200)
        }
    },

    editUser: async (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        try {
            user = {...user, ...req.body}
            await db.user.edit_user(user)
            res.status(200).send(user)
        } catch (err) {
            res.status(304).send(err)
            console.log("error editUser functionality", err)
        }
    },

    deleteUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        try {
            await db.user.delete_user([+user_id])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in deleting account", err)
            res.sendStatus(500)
        }
    },

    forgotPassword: async (req, res) => {
        const db = req.app.get('db')
        const {email} = req.body
        const newEmail = await db.auth.check_email(email)

        if(!newEmail[0]){
            res.status(404).send("Email not recognized")
        } else {
            const token = crypto.randomBytes(20).toString('hex')
            await db.user.forgot_password([token, email])
            const passTransporter = nodemailer.createTransport(smtpTransport({
                service: "gmail",
                auth: {
                    user: "writersblockdawgs@gmail.com",
                    pass: "Writersblock$"
                }
            }));

            const mailOptions = {
                from: "writersblockdawgs@gmail.com",
                to: `${email}`,
                subject: 'Reset Password',
                html: ' <p>You are receiving this because you have requested to reset the password for your account. If you did not request this, please ignore this email and your password will remain unchanged.</p>'+

                    '<p>Click <a href="http://localhost:3000/#/reset/' + token + '">here</a> to reset your password</p>'
            }

            const info = await passTransporter.sendMail(mailOptions);

            console.log("Message sent: ", info.messageId);
            res.status(200).send("Email sent");
        }
        
    },

    resetPassword: async (req,res) => {
        const db = req.app.get('db')
        const {passwordToken} = req.params
        const {password} = req.body

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await db.user.reset_password([passwordToken, hash])
        return res.status(200).send(user)
    },

    changePass: async (req, res) => {
        const db = req.app.get('db')
        const {email, user_id} = req.session.user
        const {oldPass, newPass} = req.body
    
        try {
            const [storedPass] = await db.user.get_pass(email)
            const correctPass = compareSync(oldPass, storedPass)
            if (!correctPass){
                return res.status(400).send("Incorrect Password")
            } 
    
            await db.user.edit_user_pass([user_id, newPass])
            res.sendStatus(200)

        } catch (err) {
            res.status(400).send(err)
            console.log("Error in changing pass", err)
        }
    },
}