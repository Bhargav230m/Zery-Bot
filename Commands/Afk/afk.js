const {
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  const afkDB = require("../../Schemas/afk");
  const Reply = require("../../Systems/Reply");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("afk")
      .setDescription("Add or remove your afk")
      .addStringOption((options) =>
        options
          .setName("action")
          .setDescription("Add or Remove?")
          .addChoices(
            { name: "Add Afk", value: "Add Afk" },
            { name: "Remove Afk", value: "Remove Afk" }
          )
          .setRequired(true)
      ),
    /**
     *
     * @param { ChatInputCommandInteraction } interaction
     * @param { Client } client
     */
    async execute(interaction, client) {
      const { guild, user, options } = interaction;
      let Data = await afkDB
        .findOne({ Guild: guild.id, User: user.id })
        .catch((err) => {});
      let action = options.getString("action");
      if (action == "Add Afk") {
        if (!Data) {
          await afkDB.create({
            Guild: guild.id,
            User: user.id,
            Afk: true,
          });
          const E = new EmbedBuilder()
            .setTitle("Added Afk")
            .setDescription("You are now **afk**")
            .setColor("Random");
          interaction.reply({ embeds: [E], ephemeral: true });
        }
        if (Data) {
          if (Data.Afk == true) {
            Reply(interaction, ":x:", "You are already afk", true);
          }
          if (Data.Afk == false) {
            Data.Afk = true;
            Data.save();
            const Q = new EmbedBuilder()
              .setTitle("Added Afk")
              .setDescription("You are now **afk**")
              .setColor("Random");
            interaction.reply({ embeds: [Q], ephemeral: true });
          }
        }
      }
      if (action == "Remove Afk") {
        if (!Data) {
          await afkDB.create({
            Guild: guild.id,
            User: user.id,
            Afk: false,
          });
          const D = new EmbedBuilder()
            .setTitle("Removed Afk")
            .setDescription(`You are no longer **afk**`)
            .setColor("Red");
          interaction.reply({ embeds: [D], ephemeral: true });
        }
        if (Data) {
          if (Data.Afk == false) {
            Reply(interaction, ":x:", "You are already not afk", true);
          }
          if (Data.Afk == true) {
            Data.Afk = false;
            Data.save();
            const A = new EmbedBuilder()
              .setTitle("Removed Afk")
              .setDescription(`You are no longer **afk**`)
              .setColor("Red");
            interaction.reply({ embeds: [A], ephemeral: true });
          }
        }
      }
    },
  };
  