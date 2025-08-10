import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn }) {
  
  if (!m.messageStubType || !m.chat.endsWith('@g.us')) return

  const chat = global.db.data.chats[m.chat]
  if (!chat || !chat.detect) return

  const fkontak = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
      }
    }
  }

  const usuario = `@${m.sender.split('@')[0]}`
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://qu.ax/QGAVS.jpg')

  const nombre = `*${usuario}*\n✨️ Ha cambiado el nombre del grupo\n\n🌻 Ahora el grupo se llama:\n*${m.messageStubParameters?.[0] || ''}*`
  const foto = `*${usuario}*\n🚩 Ha cambiado la imagen del grupo`
  const edit = `*${usuario}*\n🌀 Ha permitido que ${m.messageStubParameters?.[0] === 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo`
  const newlink = `🌀 El enlace del grupo ha sido restablecido por:\n*» ${usuario}*`
  const status = `El grupo ha sido ${m.messageStubParameters?.[0] === 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} por *${usuario}*\n\n💬 Ahora ${m.messageStubParameters?.[0] === 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensajes`
  const admingp = `*@${m.messageStubParameters?.[0]?.split('@')[0]}* ahora es admin del grupo 🥳\n\n💫 Acción hecha por:\n*» ${usuario}*`
  const noadmingp = `*@${m.messageStubParameters?.[0]?.split('@')[0]}* deja de ser admin del grupo 😿\n\n💫 Acción hecha por:\n*» ${usuario}*`

  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_CHANGE_SUBJECT:
      await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_ICON:
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
      await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_SETTINGS:
      await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.GROUP_CHANGE_ANNOUNCE:
      await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })
      break
    case WAMessageStubType.PARTICIPANT_PROMOTE:
      await conn.sendMessage(m.chat, {
        text: admingp,
        mentions: [m.sender, m.messageStubParameters?.[0]]
      }, { quoted: fkontak })
      break
    case WAMessageStubType.PARTICIPANT_DEMOTE:
      await conn.sendMessage(m.chat, {
        text: noadmingp,
        mentions: [m.sender, m.messageStubParameters?.[0]]
      }, { quoted: fkontak })
      break
    default:
      // console.log('Evento no controlado:', m.messageStubType, m.messageStubParameters)
      break
  }
}