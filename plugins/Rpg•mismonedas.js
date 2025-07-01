const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user) return m.reply('❌ Usuario no encontrado en la base de datos.')

  const monedas = user.cookies || 0
  const xp = user.exp || 0
  const nivel = user.level || 0

  const mensaje = `
📊 *Estado de tu cuenta*

🪙 Monedas: *${monedas.toLocaleString()}*
✨ XP: *${xp.toLocaleString()}*
🔝 Nivel: *${nivel}*
`

  return conn.reply(m.chat, mensaje.trim(), m)
}

handler.help = ['miestatus', 'mimonedas', 'miexp']
handler.tags = ['rpg', 'economia']
handler.command = ['miestatus', 'mismonedas', 'miexp']
handler.register = true
export default handler