const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");
Reply = require("../../Systems/Reply");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with pong"),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   */
  execute(interaction, client) {

    Reply(
      interaction,
      "⏳",
      `The current Websocket Latency is : \`${client.ws.ping} ms\`\nPong!`,
      true
    );
  },
};
