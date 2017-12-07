
var config = {
  // Local URL
  localApiBaseUrl: process.env.LOCAL_API_BASE_URL || "",

  // External URLs
  steamApiBaseUrl: process.env.STEAM_BASE_URL || "http://chievechat-api.azurewebsites.net/steam",

  // Database details
  databaseHost: process.env.DATABASE_HOST || "ian-odonnell.database.windows.net",
  databaseName: process.env.DATABASE_NAME || "chievechat",
  databaseUser: process.env.DATABASE_USER || "ian-odonnell",
  databasePassword: process.env.DATABASE_PASSWORD || "",

  // Google credentials
  googleClientId: process.env.GOOGLE_CLIENT_ID || "322225634533-nt5sdvs6s76agdepgfa5n4i1tg0794js.apps.googleusercontent.com",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"
}

export default config;
