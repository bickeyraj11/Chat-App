const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // change to your frontend url if needed   
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
   // console.log(socket.id)

    socket.on("joinRoom", room => socket.join(room))

    socket.on("newMessage", ({ newMessage, room }) => {
        // Handle the new message here
        console.log("New message:", newMessage, "in room:", room);
        // You can emit this message to other clients in the same room if needed
       
        io.in(room).emit("getLatestMessage", newMessage)
    });
});

app.get("/", (req, res) => {
    res.send("Socket can be Started.")
})

server.listen(8000, () =>
    console.log("app started at port 8000")
)
