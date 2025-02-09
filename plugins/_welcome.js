let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/or87jd.mp4';
  let vn2 = 'https://files.catbox.moe/51b21l.mp4';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, { audio: { url: vn }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307694217288@newsletter",
    serverMessageId: '', 
    newsletterName: ' 𝕭𝖑𝖆𝖈𝖐 𝕮𝖑𝖔𝖛𝖊𝖗 ☘' }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `♧ ＷＥＬＣＯＭＥ ⫷┈┈╯`, 
    "body": `${userName}`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, { audio: { url: vn2 }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307694217288@newsletter",
    serverMessageId: '', 
    newsletterName: ' 𝕭𝖑𝖆𝖈𝖐 𝕮𝖑𝖔𝖛𝖊𝖗 ☘' }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  `, 
    "body": `${userName}, se despide.`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}