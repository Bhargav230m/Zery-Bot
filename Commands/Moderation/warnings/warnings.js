const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warning")
    .setDescription("Warning system")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addSubcommand((subCommand) =>
      subCommand
        .setName("add")
        .setDescription("Add a warning to a user")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Select a target to warn")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("Provide a reason")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("evidence")
            .setDescription("Provide a evidence")
            .setRequired(false)
        )
    )

    .addSubcommand((subCommand) =>
      subCommand
        .setName("check")
        .setDescription("Checks the warning of the user")

        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Select a user")
            .setRequired(true)
        )
    )

    .addSubcommand((subCommand) =>
      subCommand
        .setName("remove")
        .setDescription("remove a specific warning")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Select a user")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("id")
            .setDescription("provide the warnings id")
            .setRequired(true)
        )
    )

    .addSubcommand((subCommand) =>
      subCommand
        .setName("clear")
        .setDescription("clears all the warning from a user")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Select a user")
            .setRequired(true)
        )
    ),
};
