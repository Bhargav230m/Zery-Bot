const { EmbedBuilder } = require("discord.js");
const warningSchema = require("../../../Schemas/Warning");

module.exports = {
  subCommand: "warning.check",
  execute(interaction) {
    const { options, guildId, member } = interaction;
    const target = options.getUser("target");
    const userTag = `${target.username}#${target.discriminator}`;

    const embed = new EmbedBuilder();
    warningSchema.findOne(
      { GuildID: guildId, UserID: target.id, UserTag: userTag },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          embed
            .setColor("DarkGreen")
            .setDescription(
              `${data.Content.map(
                (w, i) =>
                  `**ID**: ${i + 1}
    **By**: ${w.ExecuterTag}
    **Date**: ${w.Date}
    **Reason**: ${w.Reason}
    **Evidence**: ${w.Evidence}\n\n
    `
              ).join(" ")}`
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
