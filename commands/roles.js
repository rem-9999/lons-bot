const { MessageManager } = require("discord.js")

module.exports = {
    name: "인증",
    execute(message){
        if(!message.member.roles === (863216409596919828)) return message.reply("인증방이 아닙니다.")
        message.member.roles.add('863211905707409430')
        message.member.roles.remove('863216409596919828')
        message.reply("성공적으로 역할을 지급하였습니다.")
    }
}