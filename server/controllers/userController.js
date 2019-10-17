module.exports = {
    getUsers: async (req, res) => {
       const users = await req.app.get("db").getUsers(req.params.user)
       await res.status(200).json(users)
    },

    getRoomName: async (req, res) => {
        const { user1, user2 } = req.params
        const roomName = await req.app.get("db").getRoomName(user1, user2)
        await res.status(200).json(roomName)
    },

    getMessages: async (req, res) => {
        const messages = await req.app.get("db").getMessages(req.params.room)
        await res.status(200).json(messages)
    }
}