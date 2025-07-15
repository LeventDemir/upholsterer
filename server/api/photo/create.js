import { PhotoSchema } from "../../models/photo"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        return await new PhotoSchema(body).save()
    }
    catch (error) {
        return error
    }
})