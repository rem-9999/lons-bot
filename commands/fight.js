module.exports = {
    name: "싸움",
    execute(message){
        message.member.roles.add('871596047548436500')
        message.member.roles.add('863211905707409428')
        message.reply("역할을 지급하였습니다. 싸우는방으로 이동하십시오.\n다 싸우시고 나면 <론즈 싸움끝>명령어를 입력하세요.")
    }
}