module.exports = {
    name: "티켓",
    aliases: [],
    permissions: [],
    description: "티켓 열기",
    async execute(message, args, cmd, client, discord) {
      const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
      
      channel.setParent("820276801652916270");
  
      channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGE: false,
        VIEW_CHANNEL: false,
      });
      channel.updateOverwrite(message.author, {
        SEND_MESSAGE: true,
        VIEW_CHANNEL: true,
      });
  
      const reactionMessage = await channel.send("문의를 주셔서 감사합니다.");
  
      try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
      } catch (err) {
        channel.send("실행 도중 에러 발생.");
        throw err;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
            channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
            break;
          case "⛔":
            channel.send("5초 후 채널이 삭제됩니다");
            setTimeout(() => channel.delete(), 5000);
            break;
        }
      });
  
      message.channel
        .send(`곧 티켓 생성을 하겠습니다! ${channel}`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 7000);
          setTimeout(() => message.delete(), 3000);
        })
        .catch((err) => {
          throw err;
        });
    },
  };