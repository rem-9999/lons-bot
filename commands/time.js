module.exports ={
    name:"시간",
    execute(message){
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed
        message.channel.send(Embed.setTitle(`현재 시간`).setTimestamp(new Date()).setColor(0x00FFFF))
    }
}