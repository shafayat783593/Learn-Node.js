import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../services/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    console.log("Request", req)
    const url = req.url
    const method = req.method


    // product => products/1 => ["", "products",""]
    const urlParts = url?.split("/")
    console.log(urlParts)
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null
    console.log("this is the correct id:", id)
    // Get all product ....................



    if (method === "GET" && url === "/products") {
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
        if (!product) {
            res.writeHead(404, { "content-type": "application/json" })
            res.end(JSON.stringify({
                message: "Product not found !",
                data: null

            }))
        }
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Product recived successfully",
            data: { product }

        }))

    }

    else if (method === "POST" && url === "/products") {
        const body = await parseBody(req)
        console.log("body", body)



        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Product created successfully",
            // data: { product }

        }))
    }
    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req)
        const products = readProduct()
        const index = products.findIndex((p: IProduct) => p.id === id)
        if (index < 0) {
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify({
                message: "Product not found !",
                data: null

            }))
        }
        products[index] = { id: products[index].id, ...body }
        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Product updated successfylly !",
            data: products[index]

        }))

    } else if (method === "DELETE" && id !== null) {
        const products = readProduct()

        const index = products.findIndex((p: IProduct) => p.id === id)
        if (index < 0) {
            res.writeHead(400, { "content-type": "application/json" })
            res.end(JSON.stringify({
                message: "Product not found !",
                data: null

            }))
        }


        products.splice(index, 1)
        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
            message: "Product deleted successfylly !",
            data: null

        }))

    }



}