import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const UserSchema = new Schema (
    {
        username: {
           type: String,
           required: true,
           unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        xp: {
            type: Number,
            default: 0
        },
        completeMissions: {
            type: [Number],
            default: []
        },
        editorTheme: {
            type: String,
            default: 'codequest'
        },
        badges: {
            type: [Number],
            default: []
        },
        favoriteLanguages: {
            type: [String],
            default: []
        },
        streak: {
            type: Number,
            default: 0
        },
        lastActivityDate: {
            type: Date,
            default: null
        }
        lessonProgress: {
            type: Map,
            of: [String],
            default: []
        }
    }
)

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const User = mongoose.model('User', UserSchema)