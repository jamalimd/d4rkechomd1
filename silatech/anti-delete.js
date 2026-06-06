//ALF MD -Anti-Delete system v2.0
//By Nedy Kidy - ''Alf''
//Inahifadhi + Inarudisha ujumbe uliofutwa
import fs from 'fs';
import path from 'path';

const messageStore = new Map();
const CACHE_TIME = 5 * 60 * 1000; // Dakika 5

// 1. HIFADHI UJUMBE UKIINGIA
export async function storeMessage(m)
     if (!m ||!m.key || m.key.fromMe) return;

     const messageId = m.key.id;
     messageStore.set(messageId, {
         message: m.message,
         key: m.key.
         pushName: m.pushName || 'mtu',
         timestamp: Date.now()

    ]);

    //futa baada ya dakika 5
    setTimeout(() =>
messageStore.delete(messageId), CACHE_TIME;
]

// 2. RUDISHA UJUMBE ULIOFUTWA
export async function
handleAntidelete(deleteUpdate, conn) [
    try [
        const key = deleteUpdate.keys?.[0];
        if (!key)return;

        const messageId = key.Id;
        const deletedMsg =
messageStore.get(messageId);
        if (!deletedMsg) return;

        const chatId = key.remoteJid;
        const { message, pushName } =
deletedMsg;

          // Angalia kama antidelete imawashwa
group hili
        global.db = global.db || {};
        global.db.antiDelete =
global.db.antiDelete || {};
        if (global.db.antiDelete[chatId])
return;

      let text = '*ALF MD ANTI-DELETE*\n\';
      text += '*Jina:* $[pushName]\n';
      text +=Amefuta ujumbe:*\n\n';

      await conn.sendMessage(chatId, 
      { text });
                await conn.sendMessage(chatId,message);

                messageStore.delete(messageId);
         } catch (e) {
             console.log('ALF Antidelete Error:',e);
         }
}

//3. COMMAND.antidelete on/off
const handler =async (m, { conn, args,
isAdmin }) => {
    if (!m.isGroup) m.replay('⛔Command
hii ni ya group tu!');
    if (!isAdmin) return m.replay('⛔ wewe si 
admini mkuu  ALF!');

    const status = args[0]?.toLowerCase();
    const chatId = m.chat;

    global.db = global.db || {};
    global.db.antiDelete[chatId = true;
    m.replay('✅ *ALF MD ANTIDELETE 
IMEWASHWA*\nSasa nitakurudishia ujumbe wowote 
ukifutwa!');
   } else if (status === 'off') {
       global.db.antiDelete[chatId] = false;
       m.reply('❎ *ALF MD ANTI-DELETE 
IMEZIMWA*');
   } else {
        m.reply('📝 *ALF MD ANTI-
DELETE*\n\nTumia:\n.antidelete on -
kuwasha\n.antidelete off - kuzima');
   }
}

handler.help = ['antidelete on/off'];
handler.tags = ['group'];
handler.command = /^(antidelete|antidel|ad)$/i;
handler.group = true;
handler.admin = true;

export default handler;




