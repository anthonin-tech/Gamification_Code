import { MongoCryptCreateDataKeyError } from 'mongodb'
import { Article } from '../models/Article'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = Math.max(1, parseInt(query.page as string) || 1)
    const limit = Math.min(20, parseInt(query.limit as string) || 12)
    const category = query.category as string |undefined
    const search = query.search as string | undefined
    const filter: Record<string, any> = {}

    if (category && category !== 'Tous') {
        filter.category = category
    }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i'} },
            { summary: { $regex: search, $options: 'i'} },
        ]
    } 

    try {
        const [articles, total] = await Promise.all([
            Article
                .find(filter)
                .sort({ publishedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-content -__v')
                .lean(),
            
            Article.countDocuments(filter),
        ])
        return {
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1,
            },
        }

    } catch (error) {
        console.error('Erreur API /articles :', error)
        throw createError({
            statusCode: 500,
            message: 'Erreur lors de la récupération des articles'
        })
    }
} )