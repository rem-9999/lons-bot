module.exports = {
    name: "뮤트",
    async execute(message, args) {
        const Discord = require("discord.js")
        const Embed = new Discord.MessageEmbed()

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("관리자 권한이 필요합니다.")
        let mutee = message.mentions.members.first();
        if (!mutee) return message.channel.send("뮤트할 사용자를 입력해주세요.");
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "사유 없음"
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "Mute")
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Mute",
                        color: '#A4A4A4',
                    },
                    reason: reason,
                }) 
                muterole.setPermissions(new Discord.BitField(0));
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
            } catch (e) {
                console.log(e.stack)
            }
        } mutee.roles.add(muterole.id).then(() => {
            message.channel.send(Embed.setColor(0xFF90FF).setTitle(`**${mutee.user.username}** 유저를 뮤트하였습니다.`).setDescription(`사유: ${reason}`).setTimestamp())
        })
    }
}