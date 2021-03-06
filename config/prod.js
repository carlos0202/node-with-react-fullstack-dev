// prod.js - file for production environment keys
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoDbURI: process.env.MONGO_DB_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridApiKey: process.env.SEND_GRID_API_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN
};