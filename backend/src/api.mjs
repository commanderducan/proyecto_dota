import express from "express"
import cors from "cors"
import { Items, File } from "./models.mjs"

const app = express()
app.use(cors())
app.use(express.json({limit: '200mb'}))

app.post("/items/", async (request, response)=>{
    try {
        const item = await Items.create(request.body)
        const file = await File.create(request.body.file)
        item.setImageItem(file)
        response.sendStatus(201)
    } catch (exception) {
        console.error(exception)
        response.sendStatus(500)
    }
})

export {
    app
}