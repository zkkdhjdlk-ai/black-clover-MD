const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  const totalPjs = user.personajes?.length || 0
  const fragmentos = user.fragmentos || 0
  const duelos = user.duelosGanados || 0
  const invocaciones = user.invocaciones || 0
  const sacrificios = user.sacrificios || 0

  const texto = `
🏅 *Logros Mágicos de ${await conn.getName(m.sender)}*

🎭 Personajes: *${totalPjs}*
💀 Sacrificios: *${sacrificios}*
✨ Invocaciones: *${invocaciones}*
🌀 Fragmentos oscuros: *${fragmentos}*
⚔️ Duelos ganados: *${duelos}*

📈 Sigue explorando la magia prohibida para desbloquear más logros.
`.trim()

  conn.reply(m.chat, texto, m)
}

handler.help = ['logros']
handler.tags = ['rpg']
handler.command = ['logros']
handler.register = true
export default handler