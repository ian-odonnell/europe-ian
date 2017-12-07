import express from 'express';
import steamApi from '../externalApis/steamApi';
import Achievement from '../dblib/Achievement';
import Game from '../dblib/Game';
import Message from '../dblib/Message';
import Persona from '../dblib/Persona';
import SteamUser from '../dblib/SteamUser';

import models from '../dbmodels/models';

const router = express.Router();

router.get('/steam', async function (req, res, next) {
  try {
    let response = {};
    console.log("A");
    const allKnownGames = await Game.getAllGames();
    console.log("A");

    // Iterate over all of our Steam users
    const steamUsers = await SteamUser.getAllSteamUsers();
    console.log("A");
    for (const steamUser of steamUsers) {
      // Iterate over the user's recently played games
      console.log("Getting games for " + steamUser.steamId);
      const recentGames = await steamApi.getRecentGames(steamUser.steamId);
      console.log("Got 'em - there's " + recentGames.response.games.length);
      for (const recentGame of recentGames.response.games) {
        let gameSchema = undefined;

        // Create the game in the database if it's the first time we've heard of it
        let dbGame = allKnownGames.find((g) => g.steamId == recentGame.appid);
        if (!dbGame) {
          dbGame = await Game.createGame({
            name: recentGame.name,
            steamId: recentGame.appid,
            logoUrl: recentGame.img_logo_url // TODO: I think this is an identifier and needs converting into a full URL
          });
        }

        // Get the user's achievements for the game
        const latestAchievements = await steamApi.getGameAchievements(steamUser.steamId, recentGame.appid);
        const knownAchievements = await Achievement.getAllKnownAchievementsForGame(dbGame.id);
        const existingAchievements = await models.achievementView.findAll({ where: { gameId: dbGame.id, personaId: steamUser.personaId } });

        for (const earnedAchievement of latestAchievements.playerstats.achievements.filter((a) => a.achieved === 1)) {
          let dbAchievement = knownAchievements.find((a) => a.apiName == earnedAchievement.apiname);
          if (!dbAchievement) {
            if (!gameSchema) {
              gameSchema = await steamApi.getGameSchema(recentGame.appid);
            }

            const schemaAchievement = gameSchema.game.availableGameStats.achievements[earnedAchievement.apiname];
            dbAchievement = await Achievement.createAchievement({
              apiName: earnedAchievement.apiname,
              displayName: schemaAchievement.displayName,
              description: schemaAchievement.description,
              iconUrl: schemaAchievement.icon,
              gameId: dbGame.id
            });
          }

          if (!existingAchievements.some((a) => a.achievementId == dbAchievement.id)) {
            await Message.createMessage({
              personaId: steamUser.personaId,
              achievementId: dbAchievement.id,
              timestamp: new Date(earnedAchievement.unlocktime * 1000)
            });
          }
        }
        response = latestAchievements;
      }

    }

    res.json(response);
  }
  catch (err) {
    next();
  }
});

export default router;
