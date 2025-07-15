import { PhotoSchema } from "../../models/photo"

export default defineEventHandler(async (event) => {
    try {
        return await PhotoSchema.find().sort({ createdAt: -1 }) // en yeni en üstte
    } catch (error) {
        return error
    }
})
