const fs = require('fs');
const dotenv = require('dotenv');
if (fs.existsSync('.env')) dotenv.config({ path: '.env' });

module.exports = {
    // Session & Database
    SESSION_ID: process.env.SESSION_ID || "D4RKECHO-MD-V1",
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://kxshrii:i7sgjXF6SO2cTJwU@kelumxz.zggub8h.mongodb.net/d4rkecho_md_db',
    
    // Bot Info
    PREFIX: process.env.PREFIX || '.',
    OWNER_NUMBER: process.env.OWNER_NUMBER || '255618313342',  // Imebadilishwa kutoka 255784062158
    BOT_NAME: "D4rkEcho MD",
    BOT_FOOTER: '> 🔥 Powered by D4rkEcho Tech',
    WORK_TYPE: process.env.WORK_TYPE || "public",
    
    // Auto Features
    AUTO_VIEW_STATUS: 'true',
    AUTO_LIKE_STATUS: 'true',
    AUTO_LIKE_EMOJI: ['🔥', '❤️', '👍', '😎', '💫', '👑', '⭐', '🎉'],
    AUTO_REPLY_ENABLE: 'true',
    
    // Security – imewekwa ili kupunguza mizunguko ya kuunganisha tena
    ANTI_CALL: 'true',           // Imezinduliwa kuzuia simu zisizotarajiwa
    ANTI_DELETE: 'true',         // Imezinduliwa kuhifadhi ujumbe uliofutwa
    READ_MESSAGE: 'false',       // Usisome kiotomatiki (kuepuka mzigo)
    AUTO_TYPING: 'false',        // Usionyeshe "anaandika..."
    AUTO_RECORDING: 'false',     // Usionyeshe "anarekodi..."
    
    // Group
    WELCOME_ENABLE: 'true',
    GOODBYE_ENABLE: 'true',
    LINK_WARN_LIMIT: '3',
    LINK_ACTION: 'mute',
    LINK_WHITELIST: 'whatsapp.com,chat.whatsapp.com,youtube.com',
    GROUP_LINK: 'https://chat.whatsapp.com/GPdlJ8ip88K39E5Hok7rJh',
    
    // Channel (JID only) – Imeongezwa chaneli yako ya newsletter
    CHANNEL_JID: '120363426538840090@newsletter',  // Chaneli yako mpya
    
    // Images & Links – picha ya menu uliyotaka
    IMAGE_PATH: 'https://i.ibb.co/dZ2gmwc/upload-1780662582401-3046dde1-jpg.jpg',  // Picha yako kali
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029VbC7AgJK5cD71vGIpO3h',          // Inaweza kubadilishwa baadaye
    
    // Telegram (hiari) – bado iko tayari
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || ''
};
