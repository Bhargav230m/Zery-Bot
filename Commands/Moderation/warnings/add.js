const { EmbedBuilder } = require("discord.js");
const warningSchema = require("../../../Schemas/Warning");

module.exports = {
  subCommand: "warning.add",

  async execute(interaction) {
    const { options, guildId, user, member } = interaction;

    const target = options.getUser("target");
    const reason = options.getString("reason") || "No reason was provided";
    const evidence =
      options.getString("evidence") || "No evidence was provided";

    const warnDate = new Date(
      interaction.createdTimestamp
    ).toLocaleDateString();
    const userTag = `${target.username}#${target.discriminator}`;

    const embed = new EmbedBuilder();
    warningSchema.findOne(
      { GuildID: guildId, UserID: target.id, UserTag: userTag },
      async (err, data) => {
        if (err) throw err;

        if (!data) {
          data = new warningSchema({
            GuildID: guildId,
            UserID: target.id,
            UserTag: userTag,
            Content: [
              {
                ExecuterId: user.id,
                ExecuterTag: user.tag,
                Reason: reason,
                Evidence: evidence,
                Date: warnDate,
              },
            ],
          });
        } else {
          const warnContent = {
            ExecuterId: user.id,
            ExecuterTag: user.tag,
            Reason: reason,
            Evidence: evidence,
            Date: warnDate,
          };
          data.Content.push(warnContent);
        }
        data.save();
      }
    );
    embed
      .setColor("Random")
      .setDescription(
        `
    Warning added: ${userTag} || ${target.id} ||
    **Reason**: ${reason}
    **Evidence**: ${evidence}
    `
      )
      .setFooter({
        text: member.user.tag,
        iconURL: member.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
