import ws from 'ws'
import fetch from 'node-fetch'

async function handler(m, { conn: _envio, usedPrefix }) {
  const uniqueUsers = new Map()

  global.conns.forEach((conn) => {
    const jid = conn.user?.jid
    if (jid && conn.ws?.socket?.readyState !== ws.CLOSED) {
      const jidClean = jid.replace(/[^0-9]/g, '')
      uniqueUsers.set(jidClean, conn.user)
    }
  })

  if (!uniqueUsers.size) {
    return _envio.reply(m.chat, '⚠️ No hay sub-bots activos actualmente.', m)
  }

  const message = Array.from(uniqueUsers.values()).map((user, index) => {
    const jidClean = user.jid.replace(/[^0-9]/g, '')
    return `⚡️ SUB BOT [${index + 1}] 𝘿𝙀𝙏𝙀𝘾𝙏𝘼𝘿𝙊 ⚡️
╭───────────────⪩
│ 🧬 ID: @${jidClean}
│ 🧠 Alias: ${user.name || 'ঔৣ͜͡𝕭𝖑𝖆𝖈𝖐 𝕮𝖑𝖔𝖛𝖊𝖗 ☘︎'}
│ 🛰 Link: http://wa.me/${jidClean}
╰───────────────⪨`
  }).join('\n\n')

  const cyberTitle = `
╔═════════◆◇◆═════════╗
   👾 𝙎𝙄𝙎𝙏𝙀𝙈𝘼 𝘾𝙔𝘽𝙀𝙍𝙋𝙐𝙉𝙆 👾
   ⟦ SCANEO DE SUB-BOTS EN LÍNEA ⟧
╚═════════◆◇◆═════════╝\n`

  const cyberFooter = `\n⧎⧎ 𝙁𝙞𝙣 𝙙𝙚𝙡 𝙍𝙚𝙜𝙞𝙨𝙩𝙧𝙤 ⧎⧎
⚙️ 𝘾𝙤𝙣𝙨𝙤𝙡𝙖 𝘾𝙧𝙮𝙥𝙩𝙖𝙣𝙚𝙩 ⚙️`

  const responseMessage = `${cyberTitle}${message}${cyberFooter}`

  let img
  try {
    const res = await fetch(`https://files.catbox.moe/67wm20.jpg`)
    if (!res.ok) throw new Error('Imagen no disponible')
    img = await res.buffer()
  } catch (err) {
    console.error('Error al obtener la imagen:', err)
    return _envio.reply(m.chat, '❌ No se pudo cargar la imagen de portada.', m)
  }

  await _envio.sendFile(m.chat, img, 'cyberbots.jpg', responseMessage, m, false, {
    mentions: _envio.parseMention(responseMessage)
  })
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['serbot']
export default handler