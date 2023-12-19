const { MessageEmbed } = require('discord.js');
const getProfit = require('../../utils/getProfit');
const msToString = require('../../utils/msToString');

module.exports = {
  name: 'invest',
  description: 'invest',
  aliases: [],
  usage: 'invest',
  admin: true,
  execute: async (client, message) => {
    const user = await client.db.userdata.findOne({ id: message.author.id });
    if (!user || user.bank <= 0) {
      message.channel.send('You don\'t have any gold in the bank');
      return;
    }
    if (user.cooldown && (Date.now() - user.cooldown <= 1000 * 60 * 60 * 24)) {
      message.channel.send(`You're in cooldown!${msToString(1000 * 60 * 60 * 24 - (Date.now() - user.cooldown))}`);
      return;
    }
    const profit = getProfit();
    const newGold = user.bank + user.bank * profit;
    const embed = new MessageEmbed()
      .setTitle('Invest')
      .setColor('RANDOM')
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .addField('Gains', `${profit >= 0 ? '+' : ''}${profit * 100}%`)
      .addField('Bank Gold', `${user.bank} -> ${newGold}`);
    message.channel.send(embed);
    await client.db.userdata.updateOne({ id: message.author.id }, { $inc: { bank: user.bank * profit }, $set: { cooldown: Date.now() } }, { upsert: true });
  },
};
