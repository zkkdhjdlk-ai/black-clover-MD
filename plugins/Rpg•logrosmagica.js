const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]

  // Asegurarse que existan las propiedades y sean números
  const totalPjs = Array.isArray(user.personajes) ? user.personajes.length : 0
  const fragmentos = Number(user.fragmentos) || 0
  const duelos = Number(user.duelosGanados) || 0
  const invocaciones = Number(user.invocaciones) || 0
  const sacrificios = Number(user.sacrificios) || 0
  const misionesCompletadas = Number(user.misionesCompletadas) || 0
  const monedasGanadas = Number(user.monedasGanadas) || 0
  const horasJugadas = Number(user.horasJugadas) || 0

  const texto = `
🏅 *Logros Mágicos de ${await conn.getName(m.sender)}*

🎭 Personajes adquiridos: *${totalPjs}*
💀 Sacrificios realizados: *${sacrificios}*
✨ Invocaciones realizadas: *${invocaciones}*
🌀 Fragmentos oscuros recolectados: *${fragmentos}*
⚔️ Duelos ganados: *${duelos}*
🎯 Misiones completadas: *${misionesCompletadas}*
💰 Monedas ganadas en total: *${monedasGanadas.toLocaleString()}*
⏳ Horas jugadas: *${horasJugadas}*

📈 Sigue explorando la magia prohibida para desbloquear más logros.
`.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['logros']
handler.tags = ['rpg']
handler.command = ['logros']
handler.register = true
export default handler