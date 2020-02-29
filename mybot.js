 /* Thomas Tipper Festing
 /  Feb  29, 2020
 /  Discord Bot
*/
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => 
{
  console.log("I am ready!");
});

//config.prefix sets a prefix that must be used for the bot to respond to commands
//config.token is the code that allows access for the bot

//responds to msgs from a user as commands
client.on("message", (message) => 
{
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //prevent msgs from being too long
  var CharLimit = 2048;


  // Exit and stop if prefix isn't present or if msg is from another bot
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  //send a ping, the bot will return it
  if (command ==="ping")
  {
    message.channel.send("ping is: " + `${Date.now() - message.createdTimestamp}` + 'ms').then
    (console.log("Ping sent"));
  }

  else if (command === "hello")
  {
    message.channel.send("Hello, I am a bot!").then
    (m => console.log("<<Hello Command Sent>>"));
  }

  else if (command ==="goodbye")
  {
    message.channel.send("Oh, you're leaving?").then
    (m => console.log("<<Goodbye Command Sent>>"));
  }

  //shows how long the bot has been online since last restart/shutdown
  else if (command === "uptime")
  {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds.toFixed(2)} seconds`;
    message.channel.send(uptime).then
    (m => console.log("<<Uptime Command Sent>>"));
  }

  //bot will send input as it's own msg
  else if (command === "say")
  {
    var botsay = message.content
    var botsaid = botsay.substr(4, CharLimit)
    if (!args.length)
    {
      return null
    }
    message.delete(250);
    message.channel.send(botsaid).then
    (m => console.log("<<Say Command Sent>>"));
  }

  //else if (command === "");

  else
  {
    null
  }
});
 
//allows bot to be shutdown or restarted if command is sent from the bot's owner(me)
client.on("message", (message) =>
{
  if (message.content.startsWith(config.prefix + "restart") && message.author.id == config.ownerID)
  {
    message.channel.send("Restarting...").then
    (m => console.log("Attempting Restart")).then
    (m => client.destroy()).then
    (m => client.login(config.token)).then
    (m => console.log("Restart Succesful")).then
    (m => message.channel.send("Online again"));
  }

  if (message.content.startsWith(config.prefix + "shutdown") && message.author.id == config.ownerID)
  {
    message.channel.send("Shutting down...").then
    (m => console.log("I have shut down")).then
    (m => client.destroy());
  }
  else if (message.content.startsWith(config.prefix + "shutdown") ||(message.content.startsWith(config.prefix + "restart")) && message.author.id !== config.ownerID)
  {
    message.channel.send("Hmm :thinking: it appears that you aren't the owner of this bot");
  }
});

client.login(config.token);


 /* one of the hardest problems I have had making this was being unfamiliar with node.js.
 / The bot responds to commands sent from a user and also logs which requests are sent to the bot in the console.
*/