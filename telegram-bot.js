// telegram-bot.js
const { Telegraf, Markup, Scenes, session } = require('telegraf');
const LocalSession = require('telegraf-session-local');
const config = require('./telegram-config');
// Kwa integration halisi ya WhatsApp pairing, ingiza moduli za D4rkEcho MD
// const { activeSockets, performPairing } = require('./index'); // Adjust path

class TelegramBot {
    constructor() {
        this.bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);
        this.setupMiddlewares();
        this.setupCommands();
        this.setupHandlers();
    }

    setupMiddlewares() {
        // Hifadhi ya session za Telegram (tofauti na session za WhatsApp)
        this.bot.use((new LocalSession({ database: './database/telegram-sessions.json' })).middleware());
        
        // Kukamata makosa
        this.bot.catch((err, ctx) => {
            console.error('❌ Telegram bot error:', err);
            ctx.reply('❌ Kuna tatizo limejitokeza. Tafadhali jaribu tena baadaye.');
        });
    }

    setupCommands() {
        // Weka amri kwenye Telegram
        this.bot.telegram.setMyCommands(config.COMMANDS);
    }

    setupHandlers() {
        // Amri /start
        this.bot.start((ctx) => {
            const welcomeMessage = `🤖 *${config.TELEGRAM_BOT_NAME}* 🤖\n\n${config.MESSAGES.WELCOME}\n\n🔗 *VIUNGO VYA USAIDIZI:*\n• GitHub: ${config.URLS.GITHUB}\n• Telegram Channel: ${config.URLS.TELEGRAM_CHANNEL}\n• WhatsApp Channel: ${config.URLS.WHATSAPP_CHANNEL}\n• Newsletter JID: \`${config.URLS.NEWSLETTER_JID}\``;
            
            const buttons = Markup.inlineKeyboard([
                [
                    Markup.button.url('📢 Telegram Channel', config.URLS.TELEGRAM_CHANNEL),
                    Markup.button.url('👥 Telegram Group', config.URLS.TELEGRAM_GROUP)
                ],
                [
                    Markup.button.url('⭐ GitHub', config.URLS.GITHUB),
                    Markup.button.url('📱 WhatsApp Channel', config.URLS.WHATSAPP_CHANNEL)
                ],
                [
                    Markup.button.callback('🔧 Oanisha Bot', 'pair_menu'),
                    Markup.button.callback('📊 Hali ya Bot', 'check_status')
                ]
            ]);
            
            ctx.replyWithMarkdown(welcomeMessage, buttons);
        });

        // Amri /pair
        this.bot.command('pair', async (ctx) => {
            const args = ctx.message.text.split(' ');
            
            if (args.length < 2) {
                return ctx.replyWithMarkdown(`❌ *Matumizi:* \`/pair <namba>\`\n*Mfano:* \`/pair 255618313342\``);
            }
            
            let number = args[1];
            // Safisha namba (ondoa herufi zisizo za namba)
            const sanitizedNumber = number.replace(/[^0-9]/g, '');
            
            if (sanitizedNumber.length < 9) {
                return ctx.replyWithMarkdown('❌ Namba si sahihi. Tafadhali ingiza namba halali ikiwa na msimbo wa nchi (mfano: 255618313342).');
            }
            
            await this.handlePairing(ctx, sanitizedNumber);
        });

        // Amri /owner
        this.bot.command('owner', (ctx) => {
            ctx.replyWithMarkdown(config.MESSAGES.OWNER);
        });

        // Amri /menu
        this.bot.command('menu', (ctx) => {
            ctx.replyWithMarkdown(config.MESSAGES.HELP);
        });

        // Amri /status
        this.bot.command('status', async (ctx) => {
            await this.handleStatus(ctx);
        });

        // Amri /help
        this.bot.command('help', (ctx) => {
            ctx.replyWithMarkdown(config.MESSAGES.HELP);
        });

        // Amri /clean (kusafisha historia ya makundi)
        this.bot.command('clean', (ctx) => {
            ctx.replyWithMarkdown('🧹 *Historia ya makundi imesafishwa.*\n\nBot itaanza kuhifadhi ujumbe upya bila migogoro.');
            // Hapa unaweza kuongeza mantiki yako ya kufuta cache ya makundi
        });

        // Hii inashughulikia vitufe vya inline
        this.bot.action('pair_menu', (ctx) => {
            ctx.replyWithMarkdown(`📱 *OANISHA BOT YAKO*\n\nTumia amri:\n\`/pair <namba-yako>\`\n\n*Mfano:* \`/pair 255618313342\``);
        });

        this.bot.action('check_status', async (ctx) => {
            await this.handleStatus(ctx);
        });
    }

    async handlePairing(ctx, number) {
        try {
            // Tuma ujumbe wa kuanza
            await ctx.replyWithMarkdown(`⏳ *Inaendeshwa oanisho...*\n\n📱 Namba: +${number}\n🔗 Hali: Inaanzisha muunganisho...`);
            
            // Hapa ndipo unapounganisha na mfumo halisi wa pairing wa D4rkEcho MD.
            // Kwa mfano, ikiwa una moduli ya 'performPairing' kutoka index.js:
            /*
            const pairingResult = await performPairing(number);
            if (pairingResult.success) {
                ctx.replyWithMarkdown(`✅ *OANISHO IMEFANIKIWA!*\n\nNamba: +${number}\nSasa bot yako imeunganishwa.`);
            } else {
                ctx.replyWithMarkdown(`❌ *OANISHO IMESHINDWA*\n\nSababu: ${pairingResult.error}`);
            }
            */
            
            // Kwa sasa, tunatumia mfano wa kuiga (simulation)
            const pairingCode = Math.floor(100000 + Math.random() * 900000);
            
            setTimeout(() => {
                ctx.replyWithMarkdown(`✅ *KODI YA OANISHO IMETENGENEZWA!*\n\n📱 Namba: +${number}\n🔑 Kodi: *${pairingCode}*\n\n📋 *JINSIA YA KUTUMIA:*\n1️⃣ Fungua WhatsApp kwenye simu yako\n2️⃣ Nenda kwenye Vifaa Vilivyounganishwa (Linked Devices)\n3️⃣ Bonyeza "Oanisha Kifaa" (Link a Device)\n4️⃣ Ingiza kodi hii: *${pairingCode}*\n5️⃣ Subiri uthibitisho wa muunganisho\n\n⚠️ *Kumbuka:* Kodi hii ni halali kwa sekunde 20 pekee!`);
            }, 2000);
            
        } catch (error) {
            console.error('Pairing error:', error);
            ctx.replyWithMarkdown(`❌ *KOSA LA OANISHO*\n\nHitilafu: ${error.message}\n\nTafadhali jaribu tena au wasiliana na mmiliki.`);
        }
    }

    async handleStatus(ctx) {
        try {
            let statusMessage = `📊 *HALI YA BOT - ${config.TELEGRAM_BOT_NAME}*\n\n`;
            
            // Angalia muunganisho wa WhatsApp kupitia global.activeSockets (ikiwa unatumia)
            // Tunaangalia ikiwa global.activeSockets imefafanuliwa na ina data
            if (global.activeSockets && global.activeSockets.size > 0) {
                const activeCount = global.activeSockets.size;
                statusMessage += `✅ *Bot za WhatsApp Zinazoendeshwa:* ${activeCount}\n\n`;
                
                const activeNumbers = Array.from(global.activeSockets.keys()).slice(0, 5);
                activeNumbers.forEach((num, index) => {
                    statusMessage += `${index + 1}. +${num}\n`;
                });
                
                if (activeCount > 5) {
                    statusMessage += `... na ${activeCount - 5} nyingine\n`;
                }
            } else {
                statusMessage += `❌ *Hakuna bot ya WhatsApp inayoendeshwa kwa sasa*\n\n`;
            }
            
            statusMessage += `\n🤖 *Hali ya Telegram Bot:* ✅ Inafanya kazi\n🕒 Muda wa kuendelea: Inaendesha...\n📢 Chaneli ya Newsletter: \`${config.URLS.NEWSLETTER_JID}\`\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐃𝟒𝐫𝐤𝐄𝐜𝐡𝐨 𝐌𝐃`;
            
            ctx.replyWithMarkdown(statusMessage);
            
        } catch (error) {
            console.error('Status error:', error);
            ctx.replyWithMarkdown('❌ *KOSA*\n\nImeshindwa kupata hali ya bot. Tafadhali jaribu tena baadaye.');
        }
    }

    start() {
        this.bot.launch().then(() => {
            console.log(`🤖 ${config.TELEGRAM_BOT_NAME} Telegram bot imeanza kufanya kazi!`);
            
            // Kufunga vizuri (graceful stop)
            process.once('SIGINT', () => this.bot.stop('SIGINT'));
            process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
            
        }).catch(error => {
            console.error('❌ Imeshindwa kuanzisha Telegram bot:', error);
        });
    }
}

module.exports = TelegramBot;

// Ikiwa faili hili linaendeshwa moja kwa moja
if (require.main === module) {
    const telegramBot = new TelegramBot();
    telegramBot.start();
}
