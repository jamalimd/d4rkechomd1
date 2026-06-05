const { cmd } = require('../momy');
const axios = require('axios');

// Picha ya bot (picha yako kali)
const REPO_IMAGE = 'https://i.ibb.co/dZ2gmwc/upload-1780662582401-3046dde1-jpg.jpg';
// Link ya mradi (Heroku uliyonipa)
const REPO_LINK = 'https://d4rkechomd-d4193915ac4b.herokuapp.com/';

// fakevCard ya D4rkEcho MD (namba 255618313342)
const fakevCard = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "© D4rkEcho MD",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:D4rkEcho MD BOT\nORG:D4rkEcho Tech;\nTEL;type=CELL;type=VOICE;waid=255618313342:+255618313342\nEND:VCARD`
    }
  }
};

// Ujumbe uliopambwa kwa style ya D4rkEcho
function d4rkechoMessage(text) {
  return {
    text: text,
    contextInfo: {
      externalAdReply: {
        title: 'D4rkEcho MD',
        body: 'GitHub Repository ‧ Verified',
        thumbnailUrl: REPO_IMAGE,
        sourceUrl: REPO_LINK,
        mediaUrl: REPO_IMAGE,
        renderLargerThumbnail: true,
        mediaType: 1
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363426538840090@newsletter', // Chaneli yako
        newsletterName: 'D4rkEcho MD',
        serverMessageId: Math.floor(Math.random() * 1000000)
      },
      isForwarded: true,
      forwardingScore: 999
    }
  };
}

cmd({
    pattern: "repo",
    alias: ["repository", "github"],
    desc: "Get bot repository link",
    category: "main",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Tafuta idadi ya stars na forks (kwa repository yako kwenye GitHub)
        let stars = '⭐';
        let forks = '🔀';
        try {
            // Ikiwa una GitHub repo mpya, badilisha hapa. Kwa sasa tunatumia link ya Heroku
            const response = await axios.get('https://api.github.com/repos/D4rkEcho/D4rkEcho-MD');
            stars = response.data.stargazers_count || '⭐';
            forks = response.data.forks_count || '🔀';
        } catch (err) {
            console.log('Could not fetch GitHub stats');
        }
        
        const repoMessage = 
`┏━❑ D4RKECHO MD ━━━━━━━━━
┃ 📦 Project: D4rkEcho-MD
┃ 👨‍💻 Developer: D4rkEcho Tech
┃ 🔗 Link: ${REPO_LINK}
┃
┃ ⭐ Stars: ${stars}
┃ 🔀 Forks: ${forks}
┃
┃ 🛠️ Open Source WhatsApp Bot
┃ 💚 Made with ❤️ by D4rkEcho Team
┗━━━━━━━━━━━━━━━━━━━━

> ⚡ Powered by D4rkEcho MD`;

        const messageData = d4rkechoMessage(repoMessage);
        await conn.sendMessage(from, messageData, { quoted: fakevCard });
        
    } catch (e) {
        reply("❌ Error: " + e.message);
    }
});
