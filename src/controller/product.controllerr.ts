import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController =async (req: IncomingMessage, res: ServerResponse) => {
    console.log("Request",req)
    const url = req.url
    const method = req.method


    // product => products/1 => ["", "products",""]
    const urlParts = url?.split("/")
    console.log(urlParts)
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null
    console.log("this is the correct id:", id)
    // Get all product ....................



    if (url === "/products" && method === "GET") {
        // const products= [ 
        //     {
        //         id:1,
        //         name:"Product-1"
        //     }
        // ]
        const products = readProduct()

        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Products retrived successfully",
            data: { products }

        }))
    } else if (method === "GET" && id !== null) {
        const products = readProduct()
        const product = products.find((p: IProduct) => p.id === id)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Product recived successfully",
            data: { product }

        }))

    }

    else if(method === "POST" && url === "/products"){
        const body = await parseBody(req)
        console.log("body",body)



        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Product created successfully",
            // data: { product }

        }))
    }

}