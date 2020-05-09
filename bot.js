const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('discord-voice-move ready. blip-blop!');
});

client.on('message', message => {
    if (message.content.startsWith('!move ')) {
		message.content.substring(6).split('||').forEach(opts => {
			const args = opts.trim().split(/ +/g);
			if (args.length == 2) {
				const channel = getChannelByName(message, args[0]);
				if (channel) {
					const members = args[1].match(/<(\d+)>/g).map(m => message.guild.members.fetch(m.substring(1).slice(0, -1)));
					console.log(members);
					const membersToMove = members.filter(m => m && m.voice.channelID != null && m.voice.channelID != channel.id);
					if (membersToMove.length) {
						membersToMove.forEach(m => {
							m.voice.setChannel(channel);
						});
					} else {
						log(message, 'No members to move.');
					}
				} else {
					log(message, 'Channel not found.');
				}
			} else {
				log(message, 'Not all arguments provided.');
			}
		});
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

function log(message, content) {
	if (process.env.DEBUG) {
		message.reply(content);
	}
}

// THIS MUST BE THIS WAY
client.login(process.env.BOT_TOKEN); // BOT_TOKEN is the Client Secret
