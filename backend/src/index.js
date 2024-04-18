import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import http from "http"
import { app } from './app.js'
import boardSocketHandler from "./sockets/board.socket.js";
import meetSocketHandler from "./sockets/meet.socket.js";


dotenv.config({
    path: './.env'
});

let server = http.createServer(app)

boardSocketHandler(server);
// meetSocketHandler(server);

connectDB()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`⚙️  Socket and Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})