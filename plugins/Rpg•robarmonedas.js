const COOLDOWN = 2 * 60 * 60 * 1000
const MAX_ROB = 30

const handler = async (m, { conn, usedPrefix, command }) => {
  const userData = global.db.data.users[m.sender]
  const now = Date.now()

  if (userData.lastrob2 && now - userData.lastrob2 < COOLDOWN) {
    const timeLeft = msToTime(COOLDOWN - (now - userData.lastrob2))
    return conn.reply(m.chat, `🚩 Espera ${timeLeft} para volver a robar.`, m)
  }

  let target
  if (m.isGroup) {
    target = m.mentionedJid?.[0] ? m.mentionedJid[0] : m.quoted?.sender
  } else {
    target = m.chat
  }

  if (!target) return conn.reply(m.chat, `🚩 Debes mencionar a alguien para robar.`, m)
  if (!(target in global.db.data.users)) return conn.reply(m.chat, `🚩 El usuario no está registrado en la base de datos.`, m)
  if (target === m.sender) return conn.reply(m.chat, `🚩 No puedes robarte a ti mismo.`, m)

  const targetData = global.db.data.users[target]

  if (!targetData.monedas || targetData.monedas < MAX_ROB) {
    return conn.reply(m.chat, `😔 @${target.split("@")[0]} tiene menos de ${MAX_ROB} monedas 🪙, no robes a alguien pobre.`, m, { mentions: [target] })
  }

  const robbedAmount = Math.floor(Math.random() * MAX_ROB) + 1
  if (robbedAmount > targetData.monedas) {
    return conn.reply(m.chat, `😔 @${target.split("@")[0]} no tiene suficientes monedas para robar esa cantidad.`, m, { mentions: [target] })
  }

  userData.monedas = (userData.monedas || 0) + robbedAmount
  targetData.monedas -= robbedAmount
  userData.lastrob2 = now

  return conn.reply(m.chat, `🚩 Robaste *${robbedAmount}* monedas 🪙 a @${target.split("@")[0]}.`, m, { mentions: [target] })
}

handler.help = ['rob2']
handler.tags = ['rpg']
handler.command = ['robar2', 'rob2']
export default handler

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor(duration / (1000 * 60 * 60))
  return `${hours} Hora(s) ${minutes} Minuto(s) ${seconds} Segundo(s)`
}