import { PhotoSchema } from "../../models/photo"

export default defineEventHandler(async (event) => {
    try {
        const posts = await PhotoSchema.find().sort({ createdAt: -1 }) // en yeni en üstte
        return posts
    } catch (error) {
        return error
    }
})
