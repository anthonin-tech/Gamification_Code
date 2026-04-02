import cron from 'node-cron'
import { scrapeAllSources } from '../utils/rssScraper'

export default defineNitroPlugin(async () => {
    console.log(`Démarrage du scheduler RSS...`)
    setTimeout(async () => {
        await scrapeAllSources()
    }, 3000)
    cron.schedule('0 * * * *', async () => {
        await scrapeAllSources()
    })
    console.log('Scheduler actif - scraping toutes les heures')
})