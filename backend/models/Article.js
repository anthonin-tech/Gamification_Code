import mongoose from 'mongoose'

const { Schema } = mongoose

const ArticleSchema = new Schema(
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

export const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema)

