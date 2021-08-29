const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const talkedRecently = new Set();
const fs = require('fs');
const lyricsFinder = require('lyrics-finder');
const noblox = require('noblox')
const cooldowns = new Discord.Collection()

client.on('ready', ()=>{
    console.log(`봇이 준비됨! 봇: ${client.user.tag}`)
    client.user.setActivity("예냥유튜브 채널", {
        type: "WATCHING"
    });
})

client.on('message' ,message => {
    if(message.content === ("$핑")) {
        message.channel.send(`${Date.now()}ms`)
    }
})

client.on('guildMemberAdd',member=>{
    client.channels.cache.get('863211905731526685').send(`<@${member.user.id}>님이 본 서버에 입장하셨습니다`)
})

client.on('guildMemberRemove',member=>{
    client.channels.cache.get('863211906167472169').send(`<@${member.user.id}>님이 본 서버에서 나가셨습니다.`)
})

client.on('ready', () => {
    const guild = client.guilds.cache.get('863211905434124339');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('863211905731526681');
        if (!channel) return;
        channel.setName(`All Member:${memberCount.toLocaleString()}`);
    }, 5000);
});

client.on('ready', () => {
    const guild = client.guilds.cache.get('863211905434124339');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('863211905731526682');
        if (!channel) return;
        channel.setName(`Member:${memberCount.toLocaleString()-9}`)
    })
})

client.on('message', message => {
    if(message.content === (`${config.prefix}도움말`)) {
        let Embed = new Discord.MessageEmbed()
        .setTitle("도움말")
        .setDescription(`**론즈 피드백<론즈or슈킹or미쿠> <할말>**\n관리자에게 피드백을 전송해주는 명령어\n(5분쿨타임)\n**론즈 가사 <아티스트> <노래제목>**\n노래 가사를 찾아주는 명령어\n**론즈 봇피드백 <할말>**\n봇개발자에게 피드백 전송.\n**론즈 로블록스 <닉네임>**\n로블록스 유저의 정보를 알려주는 명령어\n**론즈 계산기**\n말 그대로 계산기.\n**론즈 삭제 <인수>**\n입력한 인수만큼 메시지를 삭제해주는 명령어.\n**론즈 노래 재생 <노래 제목or유튜브 링크>**\n노래 재생\n**론즈 노래 건너뛰기**\n노래 스킵.\n**론즈 노래 플레이리스트 확인**\n플레이리스트를 보여줌.\n**론즈 노래 플레이리스트 삭제**\n플레이리스트 삭제\n**론즈 노래 종료**\n노래 종료\n**론즈 확률 <남친or여친or결혼나이>**\n확률 알려줌\n**론즈 선택 <최대 4개 단어>**\n여러 단어중 하나를 선택해줌\n**론즈 추방 <유저맨션>**\n맨션한 유저 추방.\n**론즈 밴 <유저맨션>**\n맨션한 유저 밴\n**론즈 서버정보**\n서버정보를 알려줍니다.\n**론즈 유저정보 <유저맨션>**\n맨션한 유저의 정보를 알려줍니다.\n**론즈 싸움**\n싸움방으로 입장하는 명령어\n**론즈 싸움끝**\n싸움방에서 퇴장하는 명령어\n**론즈 뮤트 <유저맨션>**\n맨션한 유저를 뮤트합니다.\n**론즈 뮤트해제 <유저맨션>**\n맨션한 유저의 뮤트를 해제합니다.\n**론즈 내프사**\n자신의 프사를 보여줍니다.`)
        .setColor('RANDOM')
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       message.channel.send(Embed).then(message)
    }
});

client.on("message",  message => {
    if(message.content === (`${config.prefix}구독인증`)) {
      if(message.author.bot) return;
      let error = new Discord.MessageEmbed()
      .setTitle(`오류!`)
      .setDescription(`${message.author.tag} 님은 이미 구독인증역할을 소유하고있습니다`)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setColor('#FF0000')
      .setTimestamp();
      if (message.member.roles.cache.some(role => role.name === '873401195081916446')) return message.author.send(error)
      let waite = new Discord.MessageEmbed()
      .setDescription("잠시만기다려주세요..");
      let done = new Discord.MessageEmbed()
      .setTitle("구독인증 완료!")
      .setDescription(`${message.author.tag} 님이 구독인증을 완료했습니다.`)
      .setColor('#00a000')
      .setFooter(message.author.tag, message.author.displayAvatarURL());
      let join = new Discord.MessageEmbed()
      .setTitle("환영합니다!")
      .setDescription(`${message.author.tag} 님은 구독인증을 완료했습니다!`)
      .setColor('#04c3ff')
      .setFooter(message.author.tag, message.author.displayAvatarURL());
      let log = new Discord.MessageEmbed()
      .setTitle("구독인증 로그")
      .setDescription(`${message.author.tag}님이 구독인증을 완료했습니다!`)
      .setColor('#04c3ff')
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL());
      client.channels.cache.get(`873402391955914782`).send(log)
      client.channels.cache.get(`873402391955914782`).send(`<@${message.author.id}>`)
      message.author.send(join)
      message.react('✔️')
      message.member.roles.add("873401195081916446")
      message.channel.send(waite).then((msg)=> {
        setTimeout(function(){
          msg.edit(done);
        }, 5000)
      })
      }
    });

client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}봇피드백`)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        let filter = (reaction, user) => (reaction.emoji.name === "⭕" || reaction.emoji.name === "❌") && user.id === message.author.id
        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send("**오류 발생!**\n**피드백 내용을 입력해주세요.**\n__**사용법 : $봇피드백 <할말>**__")
        let feedback = new Discord.MessageEmbed()
        .setTitle("피드백 전송여부")
        .setDescription(`개발자에게 \n\n**${text}**\n\n라는 메시지를 전송하시겠습니까?\n`)
        .addField("아래 반응을 추가하여 예/아니오를 선택해주세요\n", "⭕ - 네\n\n❌ - 아니오")
        .setColor('RANDOM')
        .setFooter("※ 장난으로 전송시 제재합니다! ※")
        message.channel.send(feedback).then((msg) => {
            msg.react("⭕")
            msg.react("❌")
            msg.awaitReactions(filter, {
              max: 1,
            }).then((collected) => {
              if (collected.array()[0].emoji.name === "⭕") {
                msg.edit("**메시지가 전송되었습니다.**")
                client.users.fetch(config.owner).then((admin) => {
                    console.log(`${message.author.tag}님의 피드백 메시지가 도착했습니다.\n내용 : ${text}`)
                })
            } else {
                msg.delete();
              message.channel.send(`**전송이 취소되었습니다.**`).then(m => {
                  m.delete({timeout: 5000})
              })
            }
        })
    })
    
}
});

client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}피드백미쿠`)) {
        if (talkedRecently.has(message.author.id)) {    
            message.channel.send("해당 명령어는 5분 후 사용 할 수 있습니다.");
            message.delete()
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 300000);
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        let filter = (reaction, user) => (reaction.emoji.name === "⭕" || reaction.emoji.name === "❌") && user.id === message.author.id
        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send("**오류 발생!**\n**피드백 내용을 입력해주세요.**\n__**사용법 : $피드백미쿠 <할말>**__")
        let feedback = new Discord.MessageEmbed()
        .setTitle("피드백 전송여부")
        .setDescription(`관리자 (<@${config.owner}>) 님에게 \n\n**${text}**\n\n라는 메시지를 전송하시겠습니까?\n`)
        .addField("아래 반응을 추가하여 예/아니오를 선택해주세요\n", "⭕ - 네\n\n❌ - 아니오")
        .setColor('RANDOM')
        .setFooter("※ 장난으로 전송시 제재합니다! ※")
        message.channel.send(feedback).then((msg) => {
            msg.react("⭕")
            msg.react("❌")
            msg.awaitReactions(filter, {
              max: 1,
            }).then((collected) => {
              if (collected.array()[0].emoji.name === "⭕") {
                msg.edit("**메시지가 전송되었습니다.**")
                client.users.fetch(config.owner).then((admin) => {
                    admin.send(`**${message.author.tag}**님의 피드백 메시지가 도착했습니다.\n내용 : **${text}**`)
                })
            } else {
                msg.delete();
              message.channel.send(`**전송이 취소되었습니다.**`).then(m => {
                  m.delete({timeout: 5000})
              })
            }
        })
    })
    }
}
});

client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}피드백슈킹`)) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("해당 명령어는 5분 후 사용 할 수 있습니다.");
            message.delete()
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 300000);
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        let filter = (reaction, user) => (reaction.emoji.name === "⭕" || reaction.emoji.name === "❌") && user.id === message.author.id
        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send("**오류 발생!**\n**피드백 내용을 입력해주세요.**\n__**사용법 : $피드백슈킹 <할말>**__")
        let feedback = new Discord.MessageEmbed()
        .setTitle("피드백 전송여부")
        .setDescription(`관리자 (<@${config.owner2}>) 님에게 \n\n**${text}**\n\n라는 메시지를 전송하시겠습니까?\n`)
        .addField("아래 반응을 추가하여 예/아니오를 선택해주세요\n", "⭕ - 네\n\n❌ - 아니오")
        .setColor('RANDOM')
        .setFooter("※ 장난으로 전송시 제재합니다! ※")
        message.channel.send(feedback).then((msg) => {
            msg.react("⭕")
            msg.react("❌")
            msg.awaitReactions(filter, {
              max: 1,
            }).then((collected) => {
              if (collected.array()[0].emoji.name === "⭕") {
                msg.edit("**메시지가 전송되었습니다.**")
                client.users.fetch(config.owner2).then((admin) => {
                    admin.send(`**${message.author.tag}**님의 피드백 메시지가 도착했습니다.\n내용 : **${text}**`)
                })
            } else {
                msg.delete();
              message.channel.send(`**전송이 취소되었습니다.**`).then(m => {
                  m.delete({timeout: 5000})
              })
            }
        })
    })
    }
}
});

client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}피드백론즈`)) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("해당 명령어는 5분 후 사용 할 수 있습니다.");
            message.delete()
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 30000);
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        let filter = (reaction, user) => (reaction.emoji.name === "⭕" || reaction.emoji.name === "❌") && user.id === message.author.id
        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send("**오류 발생!**\n**피드백 내용을 입력해주세요.**\n__**사용법 : $피드백론즈 <할말>**__")
        let feedback = new Discord.MessageEmbed()
        .setTitle("피드백 전송여부")
        .setDescription(`관리자 (<@${config.owner3}>) 님에게 \n\n**${text}**\n\n라는 메시지를 전송하시겠습니까?\n`)
        .addField("아래 반응을 추가하여 예/아니오를 선택해주세요\n", "⭕ - 네\n\n❌ - 아니오")
        .setColor('RANDOM')
        .setFooter("※ 장난으로 전송시 제재합니다! ※")
        message.channel.send(feedback).then((msg) => {
            msg.react("⭕")
            msg.react("❌")
            msg.awaitReactions(filter, {
              max: 1,
            }).then((collected) => {
              if (collected.array()[0].emoji.name === "⭕") {
                msg.edit("**메시지가 전송되었습니다.**")
                client.users.fetch(config.owner3).then((admin) => {
                    admin.send(`**${message.author.tag}**님의 피드백 메시지가 도착했습니다.\n내용 : **${text}**`)
                })
            } else {
                msg.delete();
              message.channel.send(`**전송이 취소되었습니다.**`).then(m => {
                  m.delete({timeout: 5000})
              })
            }
        })
    })
    }
}
});

client.on('message', async message => {
    if(message.content.startsWith(config.prefix+"가사")) {
    const args = message.content.slice(config.prefix.length).trim().split(' ');
      let pages = []
      let current = 0
      let name = args.slice(2).join(" ")
      let artist = args[1]
      if(!name) return message.reply("사용법 : $가사 <아티스트> <노래제목>")
      let res = await lyricsFinder(artist,name) || "찾을 수 없는 노래입니다."
      for(let i = 0; i < res.length; i += 2048) {
        let lyrics = res.substring(i, Math.min(res.length, i + 2048))
        let page = new Discord.MessageEmbed()
        .setTitle(`"${artist} - ${name}" 가사`)
        .setDescription(lyrics)
        .setColor('#8b00ff')
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        pages.push(page)
    }

    const filter2 = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id == user.id)
    const Embed = await message.channel.send(` ${current+1}/${pages.length} 페이지`, pages[current])
    await Embed.react('⬅️')
    await Embed.react('➡️')

    let ReactionCol = Embed.createReactionCollector(filter2)

    ReactionCol.on("collect", (reaction) => {
        reaction.users.remove(reaction.users.cache.get(message.author.id))

        if(reaction.emoji.name == '➡️') {
            if(current < pages.length - 1) {
                current += 1
                Embed.edit(`${current+1}/${pages.length} 페이지`, pages[current])
            }
        } else {
            if(reaction.emoji.name === '⬅️') {
                if(current !== 0) {
                    current -= 1
                    Embed.edit(`${current+1}/${pages.length} 페이지`, pages[current])
                }
            }
        }
    })
}
});

client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}miku`)) {
        message.channel.send("online")
    }
})

client.on('message', message => {
    if(message.content.startsWith("미쿠님")) {
            message.reply("개발중입니다^^")
    }
})

client.on('message', msg => {
    if (msg.content.startsWith(`${config.prefix}로블록스`) && msg.content.split(' ')[2]) {
        noblox
            .getIdFromUsername(msg.content.split(' ')[2])
            .then(id => {
                noblox
                    .getPlayerInfo(id)
                    .then(info => {
                        const embed = new Discord.MessageEmbed();
                        embed.setThumbnail(
                            `http://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&username=${
                                info.username
                            }`
                        );
                        embed.setColor('00ff00');
                        embed.setTitle(`${info.username}님의 정보`);
                        embed.addField('**이름**', info.username);
                        embed.addField(
                            '**생성일**',
                            JSON.stringify(info.joinDate)
                                .split('"')[1]
                                .split('T')[0]
                        );
                        embed.addField('**밴여부**', JSON.stringify(info.isBanned));
                        embed.addField('**친구 수**', info.friendCount);
                        embed.addField('**팔로잉**', info.followingCount);
                        embed.addField('**팔로워**', info.followerCount);
                        msg.channel.send(embed);
                    })
                    .catch(err => {
                        msg.reply('오류');
                    });
            })
            .catch(err => {
                msg.reply('존재하지 않는 유저입니다');
            });
    }
});

client.on('guildMemberRemove', guildMember =>{
    if(guildMember.roles.cache.find(r => r.id === "866129777684774949")){
    guildMember.send(`${guildMember.guild}에서 뮤트된상태로 서버를 나가 밴처리 되었습니다 문의할 사항이 있으시다면 ${guildMember.guild.owner.user.tag}에게 따지십시오`)
  guildMember.ban()
  }
});

const disbut = require('discord-buttons');
const { Calculator } = require('weky');
disbut(client);
require('@weky/inlinereply');
client.on('message', async (message) => {
    if(message.content === `${config.prefix}계산기`) {
        await Calculator({
            message: message,
            embed: {
                title: '계산기',
                color: '#8b00ff',
                timestamp: true,
            },
            disabledQuery: '계산기가 종료되었습니다.',
            invalidQuery: '올바르지 않은 식입니다.',
            othersMessage: '명령어를 실행시킨사람만 이용할 수 있습니다.',
        });
    }
});

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if(!command) return
    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }
    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = ( command.cooldown || 3)*1000
    if(timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount
        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return msg.reply(`${command.name} 해당 명령어를 사용하기 위해서는 ${timeLeft.toFixed(1)}초를 더 기다리셔야 합니다.`)
        }
    }
    timestamps.set(msg.author.id, now)
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)
    try {
        command.execute(msg, args)
    }catch(error) {
        console.log(error)
    }
});

client.on('message', async message => {
    if(message.author.bot) return;

    let blacklisted = ["fuck","ㅆㅂ","시발","개새끼","씨발","개개끼","느금마","보지","자지","좆","창녀","창년","년아","병신","염병","지랄","뻐킹","뻐커","버킹","마더뻐","개새기","ㅅㅂ","섹스","색스","ㅄ","tlqkf","tlqhf","ㄱㅅㄲ","rotoRl"];

    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
        {
            message.delete()
            foundInText = true
        }
    }

    if (foundInText) {
        const user = message.author.username;
        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`${user}님 부적절한 단어 감지`)
        .setDescription('```부적절한 단어가 감지되어 자동으로 삭제되었습니다```')
        .setTimestamp()
        message.channel.send(embed)
        
        client.channels.cache.get('871356137868513340').send(`<@${message.author.id}>님이 ${message}을씀!!`);
    }
});

client.on('message', message => {
    if(message.content === `${config.prefix}서버나가기`) {
      if(message.author.id != '637572899502424064') return message.reply("봇 제작자만 쓸수있습니다")
      message.channel.send(`${message.author.username}의 의해 3초후에 봇이 서버에서 나갑니다 ㅂㅂ`)
      setTimeout(() => message.guild.leave(), 3000);
    }
  });

client.login(process.env.TOKEN);