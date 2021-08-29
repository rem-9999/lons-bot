const Discord = require("discord.js")
const Embed = new Discord.MessageEmbed()
const MuteName = "Mute"

module.exports = {
    name: "뮤트해제",
    execute(message){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("관리자 권한이 필요합니다.")
        let User = message.mentions.members.first()
        if(!User) return message.channel.send("지정된 대상이 없습니다.")
        
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))

        let role = message.guild.roles.cache.find((role) => role.name === MuteName)
        let muteembed = new Discord.MessageEmbed().setColor(0xFF90FF).setAuthor(`${member.user.tag} 유저의 뮤트를 해제했습니다.`).setTimestamp()

        if (!role) return error.send(message, "`Mute` 역할이 서버에 존재하지 않습니다.")

        let hasrole = member.roles.cache.find((r) => r.name === MuteName)
        if (hasrole) {
            member.roles
                .remove(role.id)
                .then(() => {
                    message.channel.send({ embed: muteembed })
                })
            }
    }
}