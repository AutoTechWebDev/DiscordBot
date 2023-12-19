const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'balance',
  description: 'balance',
  aliases: ['bal'],
  usage: 'balance',
  admin: true,
  execute: async (client, message) => {
    const user = await client.db.userdata.findOne({ id: message.author.id });
    const embed = new MessageEmbed()
      .setTitle('Balance')
      .setColor('RANDOM')
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .addField('Pocket', `${user ? (user.gold || 0) : 0} Gold`)
      .addField('Bank', `${user ? (user.bank || 0) : 0} Gold`);

    message.channel.send(embed);
  },
};
