import { defineMongooseModel } from '#nuxt/mongoose'

export const PhotoSchema = defineMongooseModel({
    name: 'Photo',
    schema: {
        photo: {
            type: 'string',
            required: true,
        }
    },
})