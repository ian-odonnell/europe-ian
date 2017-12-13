
var config = {
  // Local URL
  localApiBaseUrl: process.env.LOCAL_API_BASE_URL || "",

  // External URLs
  steamApiBaseUrl: process.env.STEAM_BASE_URL || "http://api.steampowered.com",

  // Database details
  databaseHost: process.env.DATABASE_HOST || "ian-odonnell.database.windows.net",
  databaseName: process.env.DATABASE_NAME || "chievechat",
  databaseUser: process.env.DATABASE_USER || "ian-odonnell",
  databasePassword: process.env.DATABASE_PASSWORD || "",

  // Google credentials
  googleClientId: process.env.GOOGLE_CLIENT_ID || "322225634533-nt5sdvs6s76agdepgfa5n4i1tg0794js.apps.googleusercontent.com",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",

  // Twitter credentials
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || "CE6sOx5Qo7nJ7acExwHGonRds",
  twiterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET || "",
  twitterCallbackUrl: process.env.TWITTER_CALLBACK_URL || "http://localhost:3000/auth/twitter/callback",

  // Battle.Net credentials
  battleNetKey: process.env.BATTLE_NET_KEY || "8h7mk4erpby9kh9bmwzxnhbtrm5yybxw",
  battleNetSecret: process.env.BATTLE_NET_SECRET || "",

  // Steam credentials
  steamApiKey: process.env.STEAM_API_KEY || "",
  steamCallbackUrl: process.env.STEAM_CALLBACK_URL || "http://localhost:3000/auth/steam/callback",
  steamRealm: process.env.STEAM_REALM || "http://localhost:3000/"
}

export default config;
