const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Megan',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`℘༒𝗔𝗫𝗘𝗟 𝗖𝗢𝗣𝗜𝗟𝗢𝗧༒℘:\n━━━━━━━━━━━\n\n 𝕊𝔸𝕃𝕌𝕋.𝖯𝗈𝗌𝖾𝗋 𝗆𝗈𝗂 𝗏𝗈𝗍𝗋𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.💭`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(``, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://metoushela-rest-api-koak.onrender.com/api/gpt4o?context=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('℘༒𝗔𝗫𝗘𝗟 𝗖𝗢𝗣𝗜𝗟𝗢𝗧༒℘\n━━━━━━━━━━━\n\n' + response + '━━━━━━━━━━━', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
