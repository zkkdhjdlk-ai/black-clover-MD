const handler = async (m, { conn }) => {
  const [target] = m.mentionedJid || []
  if (!target) return m.reply('❌ Menciona al usuario que deseas retar: *.duelopj @usuario*')

  const u1 = global.db.data.users[m.sender]
  const u2 = global.db.data.users[target]

  if (!u1.personajes || u1.personajes.length === 0 || !u2.personajes || u2.personajes.length === 0)
    return m.reply('⚠️ Ambos jugadores deben tener al menos un personaje.')

  const pj1 = u1.personajes[Math.floor(Math.random() * u1.personajes.length)]
  const pj2 = u2.personajes[Math.floor(Math.random() * u2.personajes.length)]

  const obtenerDatosPj = (nombre) => {
    const lista = [...(global.personajesTop || []), ...(global.personajesNormales || [])]
    const pj = lista.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    const rareza = global.personajesTop?.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())
      ? '👑 TOP'
      : pj?.precio >= 80000 ? '💎 Elite' : pj?.precio >= 60000 ? '⚔️ Medio' : '🌱 Básico'
    return { pj, rareza, precio: pj?.precio || 100000 }
  }

  const datos1 = obtenerDatosPj(pj1)
  const datos2 = obtenerDatosPj(pj2)

  const fuerza1 = datos1.precio + Math.floor(Math.random() * 10000)
  const fuerza2 = datos2.precio + Math.floor(Math.random() * 10000)

  const gana1 = fuerza1 >= fuerza2
  const ganador = gana1 ? m.sender : target
  const premio = Math.floor(Math.random() * 40000) + 20000

  global.db.data.users[ganador].money = (global.db.data.users[ganador].money || 0) + premio

  return conn.reply(m.chat, `⚔️ *Duelo de personajes*\n\n🎭 ${await conn.getName(m.sender)} usó: *${datos1.pj?.nombre || pj1}* (${datos1.rareza})\n🎭 ${await conn.getName(target)} usó: *${datos2.pj?.nombre || pj2}* (${datos2.rareza})\n\n🏆 Ganador: *${await conn.getName(ganador)}*\n🎁 Premio: *${premio.toLocaleString()} monedas*`, m, {
    mentions: [m.sender, target]
  })
}

handler.help = ['duelo @usuario']
handler.tags = ['rpg']
handler.command = ['duelo']
handler.register = true
export default handler