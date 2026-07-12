import { scrapeAllSources } from "../utils/rssScraper";

export default defineEventHandler(async () => {
    console.log('Scraping manuel déclenché')
    scrapeAllSources().catch(console.error)
    return { message: 'Scraping démarré en arriére-plan' }
})