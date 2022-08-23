import { defineNuxtConfig } from "nuxt";
import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/algolia"],
    runtimeConfig: {
        public: {
            primaryApiBaseUrl: process.env.PRIMARY_API_BASE_URL || "",
            primaryApiApiKey: process.env.PRIMARY_API_API_KEY || "",
            algoliaPreRegIndex: process.env.ALGOLIA_PREREG_INDEX || "prod_preregisteredusers",
            algoliaUsersIndex: process.env.ALGOLIA_USERS_INDEX || "prod_users",
            FEED_API_BASE_URL:
                process.env.FEED_API_BASE_URL ||
                "https://tonto-webfeed-api-prod-mar2022-us-ij73avvvcq-uk.a.run.app/",
            SENTRY_DSN:
                process.env.SENTRY_DSN ||
                "https://9a19e8c0c8194d1382d194e272cfc203@o956177.ingest.sentry.io/6538790",
        },
    },
    alias: {
        "~": resolve(__dirname, "./"),
    },
    buildModules: ["@pinia/nuxt"],
    build: {
        transpile: ["@heroicons/vue", "maz-ui"],
    },
    css: [
        'maz-ui/css/main.css'
    ],
    algolia: {
        instantSearch: true,
        lite: true,
        applicationId: process.env.ALGOLIA_APP_ID || "PKOSWN2NGY",
        apiKey:
            process.env.ALGOLIA_API_KEY || "d435a1aad098fb58850e965e0719c787",
    },
});
