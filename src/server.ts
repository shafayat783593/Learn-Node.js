import { createServer, IncomingMessage, Server } from "http";
import { routeHandelar } from "./routes/route";


// const port=process.env.PORT
const server:Server= createServer((req:IncomingMessage,res)=>{

routeHandelar(req,res)

})


server.listen(5000,(()=>{
    console.log(`Server is running on the port ${5000}`)
}))