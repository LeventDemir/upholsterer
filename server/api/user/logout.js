import { UserSchema } from '../../models/user'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username } = body

    try {
        const user = await UserSchema.findOne({ username })

        if (!user) {
            return { success: false, message: 'Kullanıcı bulunamadı' }
        }

        // Auth bilgisini false yapıp kaydet
        user.auth = false
        await user.save()

        // Şifre göndermeden güvenli veri döndür
        const userSafe = {
            _id: user._id,
            username: user.username,
            auth: user.auth
        }

        return { success: true, message: 'Çıkış başarılı', user: userSafe }
    } catch (error) {
        console.error('Logout API Hatası:', error)
        return { success: false, message: 'Bir hata oluştu', error: error.message }
    }
})
