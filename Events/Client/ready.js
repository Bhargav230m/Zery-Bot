const { loadCommands } = require("../../Handlers/commandHandler");
const chalk = require("chalk");
module.exports = {
  name: "ready",
  once: "true",
  execute(client) {
    console.log(chalk.green(`Logined as ${client.user.tag}`));
    const activities = [
      "Amazing Day",
      `With ${client.guilds.cache.size} guild(s)`,
    ];
    let i = 0;
    setInterval(
      () =>
        client.user.setPresence({
          activities: [{ name: activities[i++ % activities.length] }],
          status: "ONLINE",
        }),
      5000
    );

    const { connect } = require("mongoose");
    connect(client.config.DataBaseURL, {}).then(() => {
      console.log(chalk.grey("Connected to the database"));
    });

    console.log(chalk.red("BOT POWERED BY DISCORD.JS V14"));
    loadCommands(client);
  },
};
