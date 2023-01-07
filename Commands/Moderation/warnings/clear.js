const { EmbedBuilder } = require("discord.js");
const warningSchema = require("../../../Schemas/Warning");

module.exports = {
  subCommand: "warning.clear",
  async execute(interaction) {
    const { options, guildId, member } = interaction;
    const target = options.getUser("target");

    const userTag = `${target.username}#${target.discriminator}`;

    const embed = new EmbedBuilder();
    warningSchema.findOne(
      { GuildID: guildId, UserID: target.id, UserTag: userTag },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          await warningSchema.findOneAndDelete({
            GuildID: guildId,
            UserID: target.id,
            UserTag: userTag,
          });

          embed
            .setColor("Green")
            .setDescription(`${userTag}, warnings were cleared`)
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
