// TO RUN BOT TYPE: 'node . --harmony'
const commando = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new commando. Client({ disableEveryone: true, owner: '234336853015134208' });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

const newUsers = [];

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (!newUsers[guild.id]) newUsers[guild.id] = new commando.Collection();
  newUsers[guild.id].set(member.id, member.user);
  if (newUsers[guild.id].size > 10) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
    guild.channels.find("name", "general").send("Welcome our new users!\n" + userlist);
    newUsers[guild.id].clear();
  }
});
client.on('warn', console.warn);

client.on('error', console.error);

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

const config = require("./config.json");

client.on('serverNewMember', function(server, user) {
	client.sendMessage(server, "Welkom" + user.username + " bij " + server.name);
});


client.on('ready', () => {
    client.user.setGame(name = 'snow:help 🐾💗', url = 'https://twitch.tv/sylverviper', type = 1);
    client.user.setStatus('dnd')
    .then(console.log)
    .catch(console.error);
    
  });
  client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
    
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if(message.author.bot) return;
    
    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if(message.content.indexOf(config.prefix) !== 0) return;
    
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commande = args.shift().toLowerCase();
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    // const serverQueue = queue.get(message.guild.id);
    const p = config.prefix;
  
    let command = message.content.toLowerCase().split(' ')[0];
    command = commande.slice(PREFIX)
  
    
    // Let's go with a few common example commands! Feel free to delete or change those.
    if(command === "help") {message.reply("Hoezo heb je help nodig? Je hebt toch woordenboek.");
    message.author.sendMessage({embed: {
        color: 7645899,
        description: "Commands",
        fields: [{
          name:'\u200b',
          value:'\u200b'
        },
        {
            name: p+"help",
            value: "Dit menu, bruh"
          
          },
          {
            name: p+"ping",
            value: "Pong!"
          
          },
          {
            name: p+"purge",
            value: "Haalt aantal berichten weg"
          },
          
          {
            name: p+"kick",
            value: "Schopt iemand de server uit"
          
          },
          {
            name: p+"ban",
            value: "De verban-hamer heeft gesproken"
          },
          
          {
            name: p+"say",
            value: "Ik praat precies na wat jij zegt"
          },
          {
            name: p+"howgay",
            value: "Laat zien hoe gay iemand is"
          },
          
          {
            name: p+"agree",
            value: "Laat zien of ik het wel of niet met u eens ben"
          },{
            name: p+'github',
           value:'De github pagina waar de source code staat'
          },{
            name: p+'8ball',
           value:'De bal van de waarheid'
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Snowy Help"}
      }})};
    
    if(command === "ping") {
      // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
      // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if(command === "github"){
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "here",
        url: "https://github.com/orbbix/bytz",
        description: "\u200b"
      }
    });
      }
    if(command === "howgay") {
        //${member.user.tag}
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Please mention a valid member of this server");
          message.channel.send({embed: {
            color: 7645899,
            
            fields: [{
              name: "Laten we kijken hoe gay deze pleb is",
              value: `${member.user.tag} is **${Math.floor((Math.random() * 100) + 1)}%** gay`
            }]
          }})}
    if(command === "agree") {
      var x = Math.floor((Math.random() * 2) + 1);
      if(x===1){
message.channel.send("Ja, ik ben het met u eens");
      } else
        {message.channel.send("Nee, ik ben het niet met u eens")}
  }
  if(command === "8ball"){
    var eightball = [ // sets the answers to an eightball
      ":eyes:  Zeer zekers",
      ":eyes:  Nee",
      ":eyes:  Misschien??",
      ":eyes:  Hoogst waarschijnlijk",
      ":eyes:  Ik heb zo mijn twijfels",
      ":eyes:  Volgens mij niet",
      ":eyes:  Ja",
      ":eyes:  Wie weet?",
  ]
    var rand = eightball[Math.floor(Math.random() * eightball.length)];   
    message.channel.send(rand);
  }
  if(command === "test"){
    message.channel.send("some text", {
      file: "" // Or replace with FileOptions object
  });
  }
  if (command === "avatar") {
    message.channel.send(message.author.avatarURL);
}
if(command === "kill"){
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  var kill = [
    `${member.user.tag} died due an heartattack, because of all their mental disabilities`,
    `${member.user.tag} was gay in Iran, trust me you dont want to be gay in Iran`,
    `${member.user.tag} took the bullet, to the head`,
    `${member.user.tag} watched too much logan paul, which gave their eyes cancer`,
    `${member.user.tag} died of watching too much dank memes, and some of them were normie`,
    `${member.user.tag} tried to look into the mirror, then their horrible ugliness killed them`,
    `${member.user.tag} was sent to gulag, and never came back`
  ];
  
  if(!member)
    return message.reply("Please mention a valid member of this server");
    var rand = kill[Math.floor(Math.random() * kill.length)];  
  await message.channel.send(rand);
}

    //
    if(command === "say") {
      // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
      // To get the "message" itself we join the `args` back into a string with spaces: 
      const sayMessage = args.join(" ");
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{}); 
      // And we get the bot to say the thing: 
      message.channel.send(sayMessage);
    }
    
    if(command === "kick") {
      // This command must be limited to mods and admins. In this example we just hardcode the role names.
      // Please read on Array.some() to understand this bit: 
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
      if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      
      // Let's first check if we have a member and if we can kick them!
      // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
      // We can also support getting the member by ID, which would be args[0]
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.kickable) 
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
      
      // slice(1) removes the first part, which here should be the user mention or ID
      // join(' ') takes all the various parts to make it a single string.
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      // Now, time for a swift kick in the nuts!
      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  
    }
    
    if(command === "ban") {
      // Most of this command is identical to kick, except that here we'll only let admins do it.
      // In the real world mods could ban too, but this is just an example, right? ;)
      if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.bannable) 
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
  
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      await member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
    
    if(command === "purge") {
      // This command removes all messages from all users in the channel, up to 100.
      
      // get the delete count, as an actual number.
      const deleteCount = parseInt(args[0], 10);
      
      // Ooooh nice, combined conditions. <3
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
      
      // So we get our messages, and delete them. Simple enough, right?
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    if (command === 'play') {
      const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT')) {
        return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
      }
      if (!permissions.has('SPEAK')) {
        return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
      }
  
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
          await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            message.channel.send(`
  __**Song selection:**__
  ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
  Please provide a value to select one of the search results ranging from 1-10.
            `);
            // eslint-disable-next-line max-depth
            try {
              var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                maxMatches: 1,
                time: 10000,
                errors: ['time']
              });
            } catch (err) {
              console.error(err);
              return message.channel.send('No or invalid value entered, cancelling video selection.');
            }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          } catch (err) {
            console.error(err);
            return message.channel.send('🆘 I could not obtain any search results.');
          }
        }
        return handleVideo(video, message, voiceChannel);
      }
    } else if (command === 'skip') {
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
      serverQueue.connection.dispatcher.end('Skip command has been used!');
      return undefined;
    } else if (command === 'stop') {
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end('Stop command has been used!');
      return undefined;
    } else if (command === 'volume') {
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      if (!serverQueue) return message.channel.send('There is nothing playing.');
      if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
      serverQueue.volume = args[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      return message.channel.send(`I set the volume to: **${args[1]}**`);
    } else if (command === 'np') {
      if (!serverQueue) return message.channel.send('There is nothing playing.');
      return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    } else if (command === 'queue') {
      if (!serverQueue) return message.channel.send('There is nothing playing.');
      return message.channel.send(`
  __**Song queue:**__
  ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
  **Now playing:** ${serverQueue.songs[0].title}
      `);
    } else if (command === 'pause') {
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Paused the music for you!');
      }
      return message.channel.send('There is nothing playing.');
    } else if (command === 'resume') {
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Resumed the music for you!');
      }
      return message.channel.send('There is nothing playing.');
    }
  
    return undefined;
  });
client.login(config.token);