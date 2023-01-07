const { EmbedBuilder } = require("discord.js");
const warningSchema = require("../../../Schemas/Warning");

module.exports = {
  subCommand: "warning.remove",
  execute(interaction) {
    const { options, guildId, member } = interaction;
    const target = options.getUser("target");
    const warnId = options.getInteger("id");

    const userTag = `${target.username}#${target.discriminator}`;

    const embed = new EmbedBuilder();
    warningSchema.findOne(
      { GuildID: guildId, UserID: target.id, UserTag: userTag },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Content.splice(warnId, 1);
          data.save();

          embed
            .setColor("Green")
            .setDescription(
              `${userTag}, warning id: ${warnId + 1} has been removed`
            )
            .setFooter({
              text: member.user.tag,
              iconURL: member.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();
          interaction.reply({ embeds: [embed] });
        }
        if (!data) {
          embed
            .setColor("DarkRed")
            .setDescription(`${userTag} || ${target.id} || has no warnings`)
            .setFooter({
              text: member.user.tag,
              iconURL: member.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();
          interaction.reply({ embeds: [embed] });
        }
      }
    );
  },
};
