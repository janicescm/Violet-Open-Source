var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var defmessage = require('./servers/def.js'); //Import code for default server

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function asyncAJAX(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    })
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    
    /* Loop through gaming activities */
    
    var actions = [
        "with my tail",
        "with my frens",
        "being petted",
        "Super Mario Galaxy",
        "sleeping"
    ];
    var i = 0;
    
    setInterval(function () {
        if (i > actions.length) {
            i = 0;
        }
        bot.setPresence( {game: {name:actions[i]}} );
        i++
    }, 50000);
});

bot.on('guildMemberAdd', function (member) {
    
    switch (member.guild_id) {
        case "place guild id here":
            bot.sendMessage({
                to: 'place channel id here',
                message: 'Henlo! Welcome to this server! I am Violet. I am a smol kitty. Meow!'
            });
            break;
        default:
            break;
    }
            
});

bot.on('message', function (user, userID, channelID, message, evt) {
    
    switch (bot.channels[channelID].guild_id) {
        /* CHECK IF THE SERVER A CERTAIN SERVER */ 
        case "place guild id here":
            
            break;
        /* other servers */
        default:
            defmessage(bot, user, userID, channelID, message, evt, asyncAJAX);
            break;
    }
});