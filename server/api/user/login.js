import { UserSchema } from '../../models/user'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body

    try {
        const user = await UserSchema.findOne({ username })

        if (!user) {
            return { success: false, message: 'Kullanıcı bulunamadı' }
        }

        if (user.password !== password) {
            return { success: false, message: 'Şifre yanlış' }
        }

        if (user && user.password == password) {
            user.auth = true
            user.save()
        }

        return { success: true, message: 'Giriş başarılı', user }
    } catch (error) {
        return { success: false, message: 'Bir hata oluştu', error }
    }
})
