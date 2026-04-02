export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  typescript: {
    strcit: true,
    typeCheck: true,
  },

  runtimeCongig: {
    mongodbUri: process.env.MONGODB_URI ?? "",
  },
})