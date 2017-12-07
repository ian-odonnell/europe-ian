
var config = {
  steamApiBaseUrl: process.env.STEAM_BASE_URL || "http://chievechat-api.azurewebsites.net/steam",
  databaseHost: process.env.DATABASE_HOST || "ian-odonnell.database.windows.net",
  databaseName: process.env.DATABASE_NAME || "chievechat",
  databaseUser: process.env.DATABASE_USER || "ian-odonnell",
  databasePassword: process.env.DATABASE_PASSWORD || "",
  localApiBaseUrl: process.env.LOCAL_API_BASE_URL || ""
}

export default config;
