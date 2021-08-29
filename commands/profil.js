module.exports = {
    name: "내프사",
    execute(message){
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed
        message.channel.send(Embed.setTitle(`프사 입니다.`)
        .setImage(message.author.displayAvatarURL())
        .setFooter(`${message.author.tag}님`))
    }
}