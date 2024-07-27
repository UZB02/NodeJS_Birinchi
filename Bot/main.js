const TelegramBot = require("node-telegram-bot-api");

const token = "7484789302:AAFBOAYZFb7_p0ctxykfH7xA2VIJQF667oQ";
const {downloaderMethod}=require('./request')
const bot=new TelegramBot(token, {polling: true});

bot.on("message", async (msg) => {
    try{
           const chatId=msg.chat.id;
           if(msg.text === "/start"){
              const name = msg.from.first_name;
              await bot.sendMessage(
                chatId,
                `Assalomu Aleykum <b>${name}</b> botimizga xush kelibsiz.\nBotga istagram vidio linkini yuboring va uni siz yuklab beramiz`,
                {
                  parse_mode: "HTML",
                }
              );
           }
           const getVideaUrl=await downloaderMethod(msg.text)
           await bot.sendVideo(chatId, getVideaUrl.videoURL,{
            caption:"Bot tuzuvchisi <b>Muhsinbek Mirzamatov</b>"
           })
           if(msg.text === "/video"){
               await bot.sendMessage(chatId, "Video linkini yuboring")
            }
    }catch(err){
        console.log(err)
    }
})
