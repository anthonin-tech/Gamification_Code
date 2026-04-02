import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
    const config = useRuntimeConfig()

    try {
        await mongoose.connect(config.mongodbUri as string, {
            serverSelectionTimeoutMS: 5000
        })

        console.log('MongoDB connecté')
    } catch (error) {
        console.error('Erreur de connexion MongoDB: ', error)
        process.exit
    }

    process.on('SIGINT', async () => {
        await mongoose.connection.close()
        process.exit(0)
    })
})