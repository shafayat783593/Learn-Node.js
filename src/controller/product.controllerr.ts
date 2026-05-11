import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../services/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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
        try {
            const products = readProduct()
            return sendResponse(res, 200, true, "Products retrived successfully", products)

        } catch (error) {
            sendResponse(res, 500, false, "Something went wront", error)

        }
    } else if (method === "GET" && id !== null) {
        const products = readProduct()
        const product = products.find((p: IProduct) => p.id === id)
        if (!product) {
            return sendResponse(res, 404, false, "Product not found !", null)
        }

        try {
            sendResponse(res, 200, true, "Product recived successfully", product)

        } catch (error) {
            sendResponse(res, 500, false, "Something went wront", error)

        }
    }

    else if (method === "POST" && url === "/products") {
        const body = await parseBody(req)
        const products = readProduct();
        const newProduct: IProduct = {
            id: Date.now(),
            ...body
        };
        products.push(newProduct);
        try {

            insertProduct({
                id: Date.now(),
           ...body,
            })

            sendResponse(res, 200, true, "Product created successfully", newProduct)

        } catch (error) {
            sendResponse(res, 500, false, "Something went wront", error)

        }



    }
    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req)
        const products = readProduct()
        const index = products.findIndex((p: IProduct) => p.id === id)
        if (index < 0) {
            return sendResponse(res, 404, false, "Product not found !", null)

        }
        products[index] = { id: products[index].id, ...body }
        try {
            insertProduct(products)
            sendResponse(res, 200, true, "Product updated successfylly !", products[index])

        } catch (error) {
            sendResponse(res, 500, false, "Something went wront", error)
        }


    } else if (method === "DELETE" && id !== null) {
        const products = readProduct()

        const index = products.findIndex((p: IProduct) => p.id === id)
        if (index < 0) {
            return sendResponse(res, 404, false, "Product not found !", null)

        }

        try {
            products.splice(index, 1)
            insertProduct(products)
            sendResponse(res, 200, true, "Product deleted successfylly !", null)

        } catch (error) {
            sendResponse(res, 500, false, "Something went wront", error)

        }
    }
}