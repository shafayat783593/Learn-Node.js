import { createServer, IncomingMessage, Server } from "http";


// const port=process.env.PORT
const server:Server= createServer((req:IncomingMessage,res)=>{
console.log(req.url)
console.log(req.method)
const url = req.url
const method = req.method
if(url === "/" && method=== "GET"){
        // console.log("this is good route")
res.writeHead(200,{"content-type":"application/json"})
res.end(JSON.stringify({message:"This is root route"}))


} else if(url?.startsWith("/products")){
    res.writeHead(404,{"content-type":"application/json"})
res.end(JSON.stringify({message:"This is product Route"}))
}else{

    res.writeHead(404,{"content-type":"application/json"})
res.end(JSON.stringify({message:"Rout not found"}))

}


})


server.listen(5000,(()=>{
    console.log(`Server is running on the port ${5000}`)
}))