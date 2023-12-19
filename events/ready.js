const mongoUtil = require('../mongoUtil.js');
const fetchGuildConfigs = require('../utils/fetchGuildConfigs');

module.exports = async (client) => {
  await mongoUtil.connectDB(client);

  client.guildConfig = {};

  await fetchGuildConfigs(client);

  client.ready = true;
  console.log('Bot is Ready');
};
