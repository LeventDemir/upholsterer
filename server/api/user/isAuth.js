// server/api/user/isauth.js

import { UserSchema } from '../../models/user'

export default defineEventHandler(async (event) => {
    try {
        // Frontend localStorage'dan "username" gönderir
        const body = await readBody(event)
        const { username } = body

        console.log(121212)

        if (!username) {
            return { success: true, auth: false }
        }

        const user = await UserSchema.findOne({ username })

        if (user && user.auth === true) {
            // Kullanıcının gerçekten login ve yetkili olduğunu doğrular
            return { success: true, auth: true }
        } else {
            return { success: true, auth: false }
        }
    } catch (error) {
        return { success: false, message: 'Auth kontrolü sırasında hata', error }
    }
})
