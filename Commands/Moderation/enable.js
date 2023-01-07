const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const welcomeDB = require("../../Schemas/welcome");
const Reply = require("../../Systems/Reply");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-welcome")
    .setDescription("Setup your welcome system")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((options) =>
      options
        .setName("channel")
        .setDescription(
          "Select a channel where the message should be sent when a member a joins"
        )
        .setRequired(true)
    )
    .addRoleOption((options) =>
      options
        .setName("role")
        .setDescription(
          "Select a role that should be added  when a member joins"
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
        "You have already enabled **Welcome System**"
      );
    }
    const Channel = options.getChannel("channel");
    const Role = options.getRole("role");

    await welcomeDB.create({
      Guild: guild.id,
      Channel: Channel.id,
      Role: Role.id,
    });
    const E = new EmbedBuilder()
      .setTitle("Enabled Welcome-System")
      .setDescription("You have successfully enabled **Welcome System**")
      .setColor("Random");
    interaction.reply({ embeds: [E] });
  },
};