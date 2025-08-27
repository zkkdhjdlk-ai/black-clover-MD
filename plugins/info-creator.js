import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let txt_owner = "`

*"مرحبًا، هذا هو رقم منشئي. لأي مشكلة أو إذا كنت تريد إضافة البوت إلى مجموعتك، يمكنك التواصل معه."*

*𝐓𝐇𝐄 𝐂𝐀𝐑𝐋𝐎𝐒:*`\n\n  𝐓𝐇𝐄 𝐂𝐀𝐑𝐋𝐎𝐒: +212680821981"
  try {
    let res = await fetch("https://files.catbox.moe/l1ahc0.jpg")
    let buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'thumbnail.jpg', txt_owner, m)
  } catch (e) {
    console.error(e)
    m.reply('❌ No se pudo enviar la imagen del creador. Intenta más tarde.')
  }
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler
