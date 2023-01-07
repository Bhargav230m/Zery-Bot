const { Client, EmbedBuilder } = require("discord.js");
const afkDB = require("../../Schemas/afk");
const Schema = require("../../Schemas/Chatbot");
const User = require("../../Schemas/User.js");
const { BrainShopAPI } = require("../../config.json");
const axios = require("axios")
const cooldown = new Set();
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message, client) {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) {
        return;
      }
      if (message.channel.id !== data.Channel) return;

      try {
        if (!message.guild) return;
        if (message.author.bot) return;
        const res = await axios.get(
          `${BrainShopAPI}1&msg=${encodeURIComponent(message.content)}`
        );
        await message.reply({
          content: `${res.data.cnt}`,
        });
      } catch (err) {
        console.log(err);
        message.channel.send("Oops, something went wrong!");
      }
    });

    const guildId = message.guild.id;
    const userId = message.author.id;

    if (message.author.bot || !message.guild) return;
    if (cooldown.has(userId)) return;

    let user;

    try {
      const xpAmount = Math.floor(Math.random() * (25 - 15 + 1) + 15);

      user = await User.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: { xp: xpAmount },
        },
        { upsert: true, new: true }
      );

      let { xp, level } = user;

      if (xp >= level * 100) {
        ++level;
        xp = 0;

        await User.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        );

        message.reply(`🎉 <@${userId}>, you are now level ${level}!`);
      }
    } catch (err) {
      console.log(err);
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 60 * 1000);

    let afk = await afkDB.findOne({
      Guild: message.guild.id,
      User: message.author.id,
    });
    if (!afk) {
      return;
    }
    if (afk.Afk == true) {
      afk.Afk = false;
      afk.save();
      const r = new EmbedBuilder()
        .setTitle("Removed Afk")
        .setDescription("You are no longer afk")
        .setColor("Random");
      message.reply({ embeds: [r] });
    }
    const taggedMembers = await message.mentions.users.map((msg) => msg.id);
    if (taggedMembers.length > 0) {
      taggedMembers.forEach((m) => {
        afkDB.findOne(
          { Guild: message.guild.id, User: m },
          async (err, data) => {
            if (data.Afk == true) {
              message.reply({ content: `This user is currently **AFK**` });
            }
          }
        );
      });
    }
  },
};
