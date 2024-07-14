// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: [
        // Add Bootstrap CSS
        "bootstrap/dist/css/bootstrap.min.css",
    ],
    build: {
        transpile: [],
    },
    vite: {
        optimizeDeps: {
            include: ["bootstrap"],
        },
    },
});
