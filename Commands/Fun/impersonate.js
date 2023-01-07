const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  name: "sudo",
  data: new SlashCommandBuilder()
    .setName("sudo")
    .setDescription("Makes you look like someone else")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Mention a target")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Provide a message")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const member = options.getUser("user");
    const message = options.getString("message");
    interaction.channel
      .createWebhook({
        name: member.username,
        avatar: member.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send({ content: message });
        setTimeout(() => {
          webhook.delete();
        }, 3000);
      });
    interaction.reply({
      content: "Successfully impersonated the user",
      ephemeral: true,
    });
  },
};
