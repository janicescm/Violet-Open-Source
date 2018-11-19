var randommsgactive = false;
var sendrandommsg;

module.exports = function vkeamessage (bot, user, userID, channelID, message, evt, asyncAJAX) {    
    if (message.substring(0, 7) == 'violet.') {

        var args = message.substring(7).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Meow! I can see your message. purrrrrr...'
                });
            break;
            case 'support':
                bot.sendMessage({
                    to: channelID,
                    message: 'Meow! You can do it! I love you, mew!'
                });
                bot.setPresence( {game: {name:"sending love and support"}} );
            break;
            case 'prefix':
                bot.sendMessage({
                    to: channelID,
                    message: 'Purrrrr... my prefix is ```violet.```'
                });
            break;
            case 'pet':
                bot.sendMessage({
                    to: channelID,
                    message: 'Meow! Thank you <@'+ userID +'>. I like this! <3'
                });
                bot.setPresence( {game: {name:"being petted"}} );
            break;
            case 'feed':
                bot.sendMessage({
                    to: channelID,
                    message: 'Yummy! Thank you <@'+ userID +'>. I like this treat! <3'
                });
                bot.setPresence( {game: {name:"eating treats"}} );
            break;
            case 'pic':
                asyncAJAX('https://api.thecatapi.com/v1/images/search?format=json').then (
                    result => {
                        console.log(result);
                        var catto = result;
                        var parsedcatto = JSON.parse(catto);
                        bot.sendMessage({
                            to: channelID,
                            message: parsedcatto[0].url
                        });
                    }
                )
                bot.setPresence( {game: {name:"sending cat pics"}} );
            break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message:`
Henlo, I'm here to help. Here are my commands, meow!
\`\`\`
violet.help - displays a help message
violet.support - shows a supportive message
violet.ping - I will meow at you when I have received your message. mew :3
violet.pic - I will show a cat picture
violet.prefix - shows my prefix
violet.pet - give me a good patto
violet.feed - gibe me treat

I can also make dad jokes.
\`\`\`
`
                });
            break;
            case 'toggleAuto':
                if (randommsgactive == false) {
                    randommsgactive = true;
                    var randommsg = [
                        "_knocks over a cup_",
                        "_rolls over and starts to purr_",
                        "MEOW MEOW MEOW! gibe me treats",
                        "mew",
                        "I like being in this channel, it's so comfy",
                        "Please don't feed me chocolate, it makes my tummy hurt",
                        "Can someone play with me? mrow.",
                        "_Sits on top of a bookcase_",
                        "_Hides under the sofa_",
                        "I don't bring dead birbs home, I love birbs!",
                        "meow",
                        "purrrrrr...",
                        "Please let me rub my face on your leg."
                    ];
                    
                    bot.sendMessage({
                        to: channelID,
                        message: '**Auto messaging set to true**'
                    });

                    sendrandommsg = setInterval(function () {
                        bot.sendMessage({
                            to: 'channel id here',
                            message: randommsg[Math.floor(Math.random() * randommsg.length)]
                        });
                    }, 312678);
                }
                else {
                    clearInterval(sendrandommsg);
                    
                    bot.sendMessage({
                        to: channelID,
                        message: '**Auto messaging set to false**'
                    });
                    randommsgactive = false;
                    
                    clearInterval(sendrandommsg);
                }
            break;
            default:
                bot.sendMessage({
                    to: channelID,
                    message: 'Mrow, I don\'t understand this. I\'m just a smol kitten.'
                });
            break;
        }
    }

    if (message.substring(0, 4) == 'I\'m ') {
        var args = message.substring(4).split('*');
        var cmd = args[0];
        var msg = 'Henlo '+cmd+', I am Violet! Meow!'

        bot.sendMessage({
            to: channelID,
            message: msg
        });
    }

    if (message == 'henlo' || message == 'Henlo') {
        var args = message.substring(4).split('*');
        var cmd = args[0];
        var msg = 'Henlo <@'+ userID +'>. purrrrrrrr...'

        bot.sendMessage({
            to: channelID,
            message: msg
        });
    }

    if (message.match(/catto/i) && userID != '412030011563048960') {
        bot.sendMessage({
            to: channelID,
            message: 'Did I hear catto?'
        });
    }
}