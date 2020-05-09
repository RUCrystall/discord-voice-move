const Discord = require('discord.js');
const client = new Discord.Client();
const isSilent = false;

client.on('ready', () => {
    console.log('discord-voice-move ready. blip-blop!');
});

client.on('message', message => {
    if (message.content.startsWith('!move')) {
		let messageMentions = message.mentions.members.array();
		if (messageMentions.length) {
			const args = message.content.trim().split(/ +/g);
			if (args.length > 2) {
				const channel = getChannelByName(message, args[1]);
				if (channel) {
					const membersToMove = messageMentions.filter(m => m.voice.channelID != null && m.voice.channelID != channel.id);
					if (membersToMove.length) {
						membersToMove.forEach(m => {
							m.voice.setChannel(channel);
						});
					} else if (!isSilent) {
						message.reply('No members to move.');
					}
				} else if (!isSilent) {
					message.reply('Channel not found.');
				}
			} else if (!isSilent) {
				message.reply('Not all arguments provided.');
			}
		} else if (!isSilent) {
			message.reply('There are no mentions in the message.');
		}
    }
});

function getChannelByName(message, name) {
	const channelCache = message.guild.channels.cache.array().filter(c => c.type === 'voice');
	let voiceChannel = channelCache.find(c => c.id === name);
	if (voiceChannel == null) {
		voiceChannel = channelCache.find(c => c.name.toLowerCase() === name.toLowerCase());
	}
	return voiceChannel;
}

// THIS MUST BE THIS WAY
client.login(process.env.BOT_TOKEN); // BOT_TOKEN is the Client Secret
