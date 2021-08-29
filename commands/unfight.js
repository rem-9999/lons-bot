module.exports = {
    name: "싸움끝",
    execute(message){
        message.member.roles.remove('871596047548436500')
        message.member.roles.remove('863211905707409428')
        message.reply("완료.싸움을 종료합니다.")
    }
}