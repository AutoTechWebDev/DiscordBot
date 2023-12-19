const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'deposit',
  description: 'deposit',
  aliases: [],
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    const userdata = await client.db.userdata.findOne({ id: message.author.id });
    const amount = parseInt(msgArr[1], 10);
    if (isNaN(amount)) {
      message.channel.send('Enter a valid amount to deposit');
      return;
    }
    if (userdata) {
      if (userdata.gold < amount) {
        message.channel.send(`You only have ${userdata.gold} Gold!`);
        return;
      }
      const embed = new MessageEmbed()
        .setTitle('Deposit Gold')
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`${message.author} deposited ${amount} Gold!`)
        .addField('Pocket', `${userdata.gold - amount} Gold`)
        .addField('Bank', `${(userdata.bank || 0) + amount} Gold`);
      message.channel.send(embed);
      await client.db.userdata.updateOne({ id: message.author.id }, { $inc: { gold: amount * -1, bank: amount } }, { upsert: true });
    } else {
      message.channel.send('You do not have any Gold!');
    }
  },
};
