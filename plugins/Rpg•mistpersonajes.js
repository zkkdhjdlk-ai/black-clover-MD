const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user.personajes || user.personajes.length === 0) {
    return m.reply(`
🔒 *No tienes personajes aún...*
Usa *.comprar <nombre>* para obtener tu primer héroe mágico.
`.trim())
  }

  const personajesDisponibles = [...(global.personajesTop || []), ...(global.personajesNormales || [])]

  const buscarDatos = (nombre) => {
    const match = personajesDisponibles.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    return {
      precio: match?.precio || 100000,
      rareza: match
        ? global.personajesTop?.some(pt => pt.nombre.toLowerCase() === nombre.toLowerCase()) ? '👑 TOP'
        : match.precio >= 80000 ? '💎 Elite'
        : match.precio >= 60000 ? '⚔️ Medio'
        : '🌱 Básico'
        : '🌱 Básico'
    }
  }

  let totalGastado = 0
  const personajesConDatos = user.personajes.map(nombre => {
    const { precio, rareza } = buscarDatos(nombre)
    totalGastado += precio
    return { nombre, precio, rareza }
  })

  // Ordenar por precio de mayor a menor
  personajesConDatos.sort((a, b) => b.precio - a.precio)

  // Contadores por rareza
  const conteo = { '👑 TOP': 0, '💎 Elite': 0, '⚔️ Medio': 0, '🌱 Básico': 0 }
  personajesConDatos.forEach(p => conteo[p.rareza]++)

  // Lista formateada
  const lista = personajesConDatos.map((p, i) =>
    `🎴 ${i + 1}. ${p.nombre} — 💰 ${p.precio.toLocaleString()} monedas [${p.rareza}]`
  ).join('\n')

  const mensaje = `
╭══ 🎟️ *INVENTARIO MÁGICO DE PERSONAJES* 
│
${lista}
│
┣ 📦 Total personajes: *${user.personajes.length}*
┣ 💰 Total gastado: *${totalGastado.toLocaleString()} monedas*
┃
┣ 👑 TOP: *${conteo['👑 TOP']}*
┣ 💎 Elite: *${conteo['💎 Elite']}*
┣ ⚔️ Medio: *${conteo['⚔️ Medio']}*
┣ 🌱 Básico: *${conteo['🌱 Básico']}*
│
╰═📂 Fin del inventario═╯
`.trim()

  await conn.reply(m.chat, mensaje, m)
}

handler.help = ['mispersonajes', 'mispjs', 'inventario']
handler.tags = ['rpg', 'economia']
handler.command = ['mispersonajes', 'mispjs', 'inventario']
handler.register = true
export default handler