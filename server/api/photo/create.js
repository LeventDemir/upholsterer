import { PhotoSchema } from "../../models/photo"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        const result = await new PhotoSchema(body).save()

        return result

    }
    catch (error) {
        return error
    }
})