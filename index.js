const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildVoiceStates,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
  ],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();
process.on("unhandledRejection", (reason, p) => {
  const ChannelID = client.config.Anti_Crash_System_Channel_ID
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Random")
    .setTimestamp()
    .setFooter({ text: "⚠️Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});
loadEvents(client);

client.login(client.config.token);
