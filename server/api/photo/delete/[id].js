import { PhotoSchema } from "../../../models/photo"

export default defineEventHandler(async (event) => {
    const id = event.context.params.id

    try {
        const deletedPhoto = await PhotoSchema.findByIdAndDelete(id)

        if (!deletedPhoto) {
            return {
                success: false,
                message: "Belirtilen ID ile fotoğraf bulunamadı."
            }
        }

        return {
            success: true,
            message: "Fotoğraf başarıyla silindi.",
            data: deletedPhoto
        }
    } catch (error) {
        console.error("Silme hatası:", error)
        return {
            success: false,
            message: "Fotoğraf silinirken bir hata oluştu.",
            error: error.message
        }
    }
})
