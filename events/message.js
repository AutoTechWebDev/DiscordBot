const initializeGuild = require('../utils/initializeGuild');

module.exports = async (client, distube, message) => {
  if (!client.ready) return;

  if (message.author.bot) return;

  const msg = message.content.toLowerCase();
  const commandName = msg.split(' ')[0].substring(1);

  if (!message.member) {
    return;
  }

  if (!client.guildConfig[message.guild.id]) {
    await initializeGuild(client, message.guild.id);
  }

  if (message.content.startsWith(client.guildConfig[message.guild.id].prefix)) {
    const command = client.commands.get(commandName);
    if (!command) {
      return;
    }
    try {
      command.execute(client, message, client.guildConfig[message.guild.id], distube);
    } catch (error) {
      console.error(error);
    }
  }
};
