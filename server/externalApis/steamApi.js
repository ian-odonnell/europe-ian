import { ExternalApi } from './externalApi';
import getBaseUrl from './baseUrl';
import config from '../../config';

var steamApi = new ExternalApi(getBaseUrl("steam"));

// TODO: Config file!  Reset it and make sure the final key isn't in source control
var apiKey = config.steamApiKey;

steamApi.getRecentGames = async (steamUserId) => {
  // return await steamApi.get(`/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamUserId}`);
  return await steamApi.get(`/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamUserId}`);
};

steamApi.getGameAchievements = async (steamUserId, steamAppId) => {
  return await steamApi.get(`/ISteamUserStats/GetPlayerAchievements/v0001/?key=${apiKey}&steamid=${steamUserId}&appid=${steamAppId}`);
}

steamApi.getGameSchema = async (steamAppId) => {
  return await steamApi.get(`/ISteamUserStats/GetSchemaForGame/v0001/?key=${apiKey}&appid=${steamAppId}`);
}

export default steamApi;
