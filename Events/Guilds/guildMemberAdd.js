const { EmbedBuilder } = require("discord.js");
const welcomeDB = require("../../Schemas/welcome");
module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const { guild } = member;
    const Data = await welcomeDB.findOne({ Guild: guild.id });
    if (!Data) return;

    const Channel = guild.channels.cache.get(Data.Channel);
    if (!Channel) return;

    const E = new EmbedBuilder()
      .setTitle("New Member!")
      .setDescription(
        "Hey, It looks like that a new member has joined our server"
      )
      .addFields({ name: "Total members", value: `${guild.memberCount}` })
      .addFields({ name: `Member Name`, value: `<@${member.id}>` })
      .setTimestamp()
      .setColor("Random");
    Channel.send({ embeds: [E] });
    member.roles.add(Data.Role);
  },
};
