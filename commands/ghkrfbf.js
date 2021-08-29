module.exports = {
    name:"확률",
    execute(message,args){
      const playerDice1 = Math.floor(Math.random() * 100 + 1)
      const playerDice2 = Math.floor(Math.random() * 50 + 1)
      if(args[0] == "여친"){
        message.channel.send(`${message.author.username}님이 여친이 생길확률은 ${playerDice1}% 입니다.`)
      }
      if(args[0] == "남친"){
        message.channel.send(`${message.author.username}님이 남친이 생길확률은 ${playerDice1}% 입니다.`)
      }
      if(args[0] == "결혼나이"){
              message.channel.send(`${message.author.username}님의 예상 결혼나이는 ${playerDice2}살 입니다.`)
      } 
    }
  }