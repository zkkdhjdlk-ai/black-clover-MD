const PRECIO = 100000 // Precio fijo por personaje

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user.personajes || user.personajes.length === 0) {
    return m.reply('🎭 No tienes ningún personaje en tu colección.\nUsa *.comprar <nombre>* para obtener uno.')
  }

  const lista = user.personajes
    .map((p, i) => `🧩 ${i + 1}. ${p} — 💰 ${PRECIO.toLocaleString()} monedas`)
    .join('\n')

  const totalGastado = PRECIO * user.personajes.length

  const mensaje = `
🎟️ *Tu colección de personajes mágicos*

${lista}

📦 Total de personajes: *${user.personajes.length}*
💸 Total gastado: *${totalGastado.toLocaleString()} monedas 🪙*
`.trim()

  conn.reply(m.chat, mensaje, m)
}

handler.help = ['mispersonajes', 'inventario']
handler.tags = ['rpg', 'economia']
handler.command = ['mispersonajes', 'mispjs', 'inventario']
handler.register = true
export default handler