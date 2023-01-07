const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  const welcomeDB = require("../../Schemas/Chatbot");
  const Reply = require("../../Systems/Reply");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("setup-chatbot")
      .setDescription("Setup your chatbot system")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addChannelOption((options) =>
        options
          .setName("channel")
          .setDescription(
            "Select a channel where the ai messages should be sent"
          )
          .setRequired(true)
      ),
    async execute(interaction, client) {
      const { guild, options } = interaction;
      let Data = await welcomeDB.findOne({ Guild: guild.id });
      if (Data) {
        return Reply(
          interaction,
          ":x:",
          "You have already enabled **Chatbot System**"
        );
      }
      const Channel = options.getChannel("channel");
  
      await welcomeDB.create({
        Guild: guild.id,
        Channel: Channel.id,
      });
      const E = new EmbedBuilder()
        .setTitle("Enabled Chatbot-System")
        .setDescription("You have successfully enabled **Chatbot System**")
        .setColor("Random");
      interaction.reply({ embeds: [E] });
    },
  };
  //welcome