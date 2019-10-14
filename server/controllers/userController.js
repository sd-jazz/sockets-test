module.exports = {
    getUsers: async (req, res) => {
       const users = await req.app.get("db").getUsers(req.params.user)
       await res.status(200).json(users)
    }
}