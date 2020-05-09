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
			if (args.length > 2) {
				const channel = getChannelByName(message, args[1]);
				if (channel) {
					const membersToMove = messageMentions.filter(m => {
						const member = message.guild.members.get(m.id);
						if (member.voiceChannelID != null && member.voiceChannelID != channel.id) return true;
					});
					membersToMove.forEach(m => {
						m.setVoiceChannel(channel);
					});
				}
			}
		}
    }
});

function getChannelByName(message, findByName) {
	let voiceChannel = message.guild.channels.find(c => c.id === findByName);
	if (voiceChannel === null) {
		voiceChannel = message.guild.channels.find(c => c.name.toLowerCase() === findByName.toLowerCase() && c.type === 'voice');
	}
	return voiceChannel;
}

// THIS MUST BE THIS WAY
client.login(process.env.BOT_TOKEN); // BOT_TOKEN is the Client Secret
