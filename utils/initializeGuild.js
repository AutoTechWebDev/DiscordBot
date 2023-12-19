module.exports = (client, guildID) => {
  client.guildConfig[guildID] = {
    prefix: '!',
  };
  client.cooldowns[guildID] = {}; client.db.config.updateOne({ id: guildID }, {
    $set: client.guildConfig[guildID],
  },
  { upsert: true });
};
