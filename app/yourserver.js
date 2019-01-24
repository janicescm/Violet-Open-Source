module.exports = function yourserverMessage (bot, user, userID, channelID, message, evt, asyncAJAX) {
    const botID = 'enter your bot ID here';
    /* this is a very hardcoded prefix */
    if (message.substring(0, 7) == 'violet.') {
        
        var args = message.substring(7).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            /* very standard ping command */
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Meow! I can see your message. purrrrrr...'
                });
            break;
            /* violet will send a supportive message */
            case 'support':
                bot.sendMessage({
                    to: channelID,
                    message: 'Meow! You can do it! I love you, mew!'
                });
                bot.setPresence( {game: {name:"sending love and support"}} );
            break;
            /* you can pet violet */
            case 'pet':
                bot.sendMessage({
                    to: channelID,
                    message: 'Meow! Thank you <@'+ userID +'>. I like this! <3'
                });
                bot.setPresence( {game: {name:"being petted"}} );
            break;
            /* you can feed violet */
            case 'feed':
                bot.sendMessage({
                    to: channelID,
                    message: 'Yummy! Thank you <@'+ userID +'>. I like this treat! <3'
                });
                bot.setPresence( {game: {name:"eating treats"}} );
            break;
            /* violet will look for an image on thecatAPI and send the image back to you */
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
violet.pet - give me a good patto
violet.feed - gibe me treat

I can also make dad jokes.
\`\`\`
`
                });
            break;
            /* violet won't understand every command */
            default:
                bot.sendMessage({
                    to: channelID,
                    message: 'Mrow, I don\'t understand this. I\'m just a smol kitten.'
                });
            break;
        }
    }

    /* dad jokes, who doesn't love them? */
    if (message.substring(0, 4) == 'I\'m ') {
        var args = message.substring(4).split('*');
        var cmd = args[0];
        var msg = 'Henlo '+cmd+', I am <@'+ botID +'>! Meow!'

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

    /* basic regex command. violet will respond to the word "catto", except when she says it herself */
    if (message.match(/catto/i) && userID != botID) {
        bot.sendMessage({
            to: channelID,
            message: 'Did I hear catto?'
        });
    }
}
