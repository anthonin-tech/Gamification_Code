import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
    title: string
    link: string
    summary: string 
    content: string
    author: string
    publishedAt: Date
    source: string
    sourceUrl: string
    category: string
    tags: string[]
    imageUrl: string
    createdAt: Date
}

const ArticleSchema = new Schema<IArticle>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        link: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        summary: {
            type: String,
            default: '',
            maxLength: 1000,
        },

        content: {
            type: String,
            default: '',
        },

        author: {
            type: String,
            default: 'Inconnu',
        },

        publishedAt: {
            type: Date,
            required: true,
        },

        source: {
            type: String,
            required: true,
            index: true,
        },

        sourceUrl: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            default: 'Général',
            index: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        imageUrl: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
)

ArticleSchema.index({ category: 1, publishedAt: -1 })
ArticleSchema.index({ publishedAt: -1 })

export const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)
