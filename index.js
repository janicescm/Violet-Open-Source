/* This is violet, a simple Discord bot that beginner bot makers can use to build upon */

/* imports */
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

/* import code from app folder */
var yourserverMessage = require('./app/yourserver.js');
var standardMessage = require('./app/standard.js');

/* basic async request */
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

/* Configure logger settings */
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

/* Initialize Discord Bot */
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    bot.setPresence( {game: {name:"with my tail"}} );
    
    /* the following code will set violet's presence (playing a game status) */
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

/* violet can greet new members when they enter your server */
bot.on('guildMemberAdd', function (member) {
    
    switch (member.guild_id) {
        /* check for a server/guild id */
        case "Place your server/guild id here":
            bot.sendMessage({
                to: '452594473499754519',
                message: 'Henlo, <@'+member.id+'>! Welcome to this server! I am <@412030011563048960>. I am a smol kitty. Meow!'
            });
            break;
        /* default action */
        default:
            break;
    }
            
});

/* violet can send messages too! violet will run server-specific code */
bot.on('message', function (user, userID, channelID, message, evt) {
    
    switch (bot.channels[channelID].guild_id) {
        /* check for a server/guild id */ 
        case "":
            yourserverMessage(bot, user, userID, channelID, message, evt, asyncAJAX);
            break;
        /* default server/guild */
        default:
            standardMessage(bot, user, userID, channelID, message, evt, asyncAJAX);
            break;
    }
});