import { createServer, IncomingMessage, Server } from "http";
import { routeHandelar } from "./routes/route";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT
// const port=process.env.PORT
const server:Server= createServer((req:IncomingMessage,res)=>{

routeHandelar(req,res)

})


server.listen(port,(()=>{
    console.log(`Server is running on the port ${port}`)
}))