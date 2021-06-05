module.exports = {
    getCritterpedia: async(req, res) => {
        try {
            const db = req.app.get('db')

            const {user_id} = req.session.user
            const [critterpedia] = await db.critterpedia.get_critterpedia(+user_id)
            res.status(200).send(critterpedia)
        } catch (err) {
            console.log(err)
            res.sendStatus(404)
        }
    },

    updateCritterpedia: async(req, res) => {
        try {
            const db = req.app.get('db')

            const {critterArrType, critterArr} = req.body
            const {user_id} = req.session.user
    
            const [critterpedia] = await db.critterpedia.update_critterpedia([+user_id, critterArrType, critterArr])
            res.status(200).send(critterpedia)
        } catch (err) {
            console.log("Database error on editBugs Function", err)
            res.sendStatus(400)
        }
    }
}