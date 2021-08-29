module.exports = {
    name: "선택",
    cooldown: 5,
    execute(message, args) {
        if(!args[0]) return message.reply(`항목을 입력해주세요!!`)
        if(!args[1]) return message.reply(`항목을 두 개 이상 입력해주세요!!`)
        if(args[4]) return message.reply(`항목은 최대 네 개까지 입력 가능해요!!`)
        const i = args.length
        let random = parseInt(Math.random() * i);
        message.reply(`나는... **${args[random]}** (이/가) 좋은것같아요!!`);
    }
}