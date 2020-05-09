const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('discord-voice-move ready. blip-blop!');
});

client.on('message', message => {
    if (message.content.startsWith('!move')) {
		let messageMentions = message.mentions.users.array();
		if (messageMentions.length) {
			const args = message.content.trim().split(/ +/g);
			message.reply(args[0]);
		}
    }
});

// THIS MUST BE THIS WAY
client.login(process.env.BOT_TOKEN); // BOT_TOKEN is the Client Secret
