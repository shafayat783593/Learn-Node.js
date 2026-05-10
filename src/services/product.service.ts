import path from "path"
import fs from 'fs'
const filePath = path.join(process.cwd(),"./src/database/db.json")


export const readProduct = ()=>{
    // console.log(process.cwd())
    const products = fs.readFileSync(filePath,"utf-8")
return JSON.parse(products)
}