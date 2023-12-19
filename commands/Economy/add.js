const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'add',
  description: 'add',
  aliases: [],
  usage: 'add @user <amount>',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.hasPermission(['ADMINISTRATOR'])) { message.reply('You\'re not allowed to use this command!'); return; }
    const msgArr = message.content.split(' ');
    const target = message.mentions.users.first() || client.users.cache.get(msgArr[1]);
    const amount = parseInt(msgArr[2], 10);
    if (!target) {
      message.channel.send('Specify a valid target');
      return;
    }
    if (isNaN(amount)) {
      message.channel.send('Enter a valid amount to add');
      return;
    }
    const user = await client.db.userdata.findOne({ id: target.id });
    const embed = new MessageEmbed()
      .setTitle('Add Gold')
      .setColor('RANDOM')
      .setAuthor(target.tag, target.avatarURL({ dynamic: true }))
      .setThumbnail(target.avatarURL({ dynamic: true }))
      .setDescription(`${message.author} gave ${target} ${amount} Gold!`)
      .addField('Pocket', `${user ? (user.gold || 0) + amount : amount} Gold`)
      .addField('Bank', `${user ? (user.bank || 0) : 0} Gold`);

    message.channel.send(embed);
    await client.db.userdata.updateOne({ id: target.id }, { $inc: { gold: amount } }, { upsert: true });
  },
};
