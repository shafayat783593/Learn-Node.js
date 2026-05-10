import type { IncomingMessage, ServerResponse } from "http";

export  const productController = (req :IncomingMessage,res:ServerResponse)=>{
const url = req.url
const method = req.method

if(url === "/products" && method ==="GET"){
    const products= [ 
        {
            id:1,
            name:"Product-1"
        }
    ]

    res.writeHead(404,{"content-type":"application/json"})
  res.end(JSON.stringify({message:"This is product Route",
    data:{products}
    
  }))
}
}