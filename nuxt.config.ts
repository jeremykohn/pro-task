export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/app/assets/css/tailwind.css'],
  typescript: {
    strict: true,
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  imports: {
    dirs: ['./stores'],
  },
  ssr: true,
})
