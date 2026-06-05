const { cmd, commands } = require('../momy');
const config = require('../config');

// Commande Ping - D4rkEcho MD
cmd({
    pattern: "ping",
    desc: "Check bot latency",
    category: "general",
    react: "😎"
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, myquoted }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '🔍 _checking connection..._' }, { quoted: myquoted });
        const endTime = Date.now();
        const ping = endTime - startTime;
        
        const pongMessage = `*⚡ D4rkEcho MD PONG : ${ping} ms*`;
        
        await conn.sendMessage(from, { text: pongMessage }, { quoted: message });
    } catch (e) {
        console.log(e);
        reply(`❌ error: ${e.message}`);
    }
});

// Commande Alive - D4rkEcho MD
cmd({
    pattern: "alive",
    desc: "Check if bot is alive",
    category: "general",
    react: "🔐"
},
async(conn, mek, m, { from, reply, myquoted }) => {
    try {
        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/dZ2gmwc/upload-1780662582401-3046dde1-jpg.jpg' },
            caption: `╭━━【 D4rkEcho MD BOT 】━━━━━━━━╮
│ status: *active & running*
│ prefix: *${config.PREFIX}*
│ version: *1.0.0*
│ developed: *D4rkEcho Tech*
╰━━━━━━━━━━━━━━━━━━━━╯

${config.BOT_FOOTER || '> 🔥 Powered by D4rkEcho Tech'}`
        }, { quoted: myquoted });
    } catch (e) {
        reply("error: " + e.message);
    }
});
