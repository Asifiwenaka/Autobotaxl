const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports.config = {
  name: "remini",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Eugene Aguilar",
  description: "Enhance image using Remini API",
  commandCategory: "tools",
  usages: "[ reply a photo ]",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  const messageReply = event.messageReply;

  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0 || messageReply.attachments[0].type !== "photo") {
    return api.sendMessage("𝗣𝗹𝗲𝗮𝘀𝗲🌱 𝗿𝗲𝗽𝗹𝘆🌱 to a 𝗽𝗵𝗼𝘁𝗼🌱 to 𝘂𝘀𝗲🌱 this 𝗰𝗼𝗺𝗺𝗮𝗻𝗱🍀.", event.threadID, event.messageID);
  }

  const photoUrl = messageReply.attachments[0].url;

  try {
    const response = await axios.get(`https://eurix-api.replit.app/remini?input=${encodeURIComponent(photoUrl)}`, { responseType: "arraybuffer"});
    const img = response.data;


    const photoPath = path.join(__dirname, 'cache', 'enhanced.jpg');

    fs.writeFileSync(photoPath, Buffer.from(img), 'binary');

    api.sendMessage({ body: "✨ 𝗘𝗻𝗵𝗮𝗻𝗰𝗲🍀 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆🌿", 𝗮𝘁𝘁𝗮𝗰𝗵𝗺𝗲𝗻𝘁🌱: fs.createReadStream(photoPath) }, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error calling Remini API:", error);
    api.sendMessage(`An error occurred while processing the image. Please try again later.\n${error}`, event.threadID, event.messageID);
  }
};