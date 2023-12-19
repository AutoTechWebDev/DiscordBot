/* eslint-disable consistent-return */
/* eslint-disable max-len */
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Clear user balance',
  aliases: [],
  usage: 'clear @user',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.hasPermission(['ADMINISTRATOR'])) { message.reply('You\'re not allowed to use this command!'); return; }

    const msgArr = message.content.split(' ');
    const target = message.mentions.users.first() || client.users.cache.get(msgArr[1]);
    const embed = new MessageEmbed()
      .setTitle('Clear Gold')
      .setColor('RANDOM')
      .setAuthor(target.tag, target.avatarURL({ dynamic: true }))
      .setThumbnail(target.avatarURL({ dynamic: true }))
      .setDescription(`${message.author} cleared ${target} Pocket and Bank Gold!`);
    message.channel.send(embed);
    await client.db.userdata.updateOne({ id: target.id }, { $set: { gold: 0, bank: 0 } }, { upsert: true });
  },
};
