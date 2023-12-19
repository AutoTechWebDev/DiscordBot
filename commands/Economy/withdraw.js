const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'withdraw',
  description: 'withdraw',
  aliases: [],
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    const userdata = await client.db.userdata.findOne({ id: message.author.id });
    const amount = parseInt(msgArr[1], 10);
    if (isNaN(amount)) {
      message.channel.send('Enter a valid amount to withdraw');
      return;
    }
    if (userdata) {
      if (userdata.bank < amount) {
        message.channel.send(`You only have ${userdata.gold} Gold in the Bank!`);
        return;
      }
      const embed = new MessageEmbed()
        .setTitle('Deposit Gold')
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`${message.author} withdrawn ${amount} Gold!`)
        .addField('Pocket', `${(userdata.gold || 0) + amount} Gold`)
        .addField('Bank', `${userdata.bank - amount} Gold`);
      message.channel.send(embed);
      await client.db.userdata.updateOne({ id: message.author.id }, { $inc: { gold: amount, bank: amount * -1 } }, { upsert: true });
    } else {
      message.channel.send('You do not have any Gold!');
    }
  },
};
