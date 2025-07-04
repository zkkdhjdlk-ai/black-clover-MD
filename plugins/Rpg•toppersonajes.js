const handler = async (m, { conn }) => {
  const db = global.db.data.users

  // Asegurar que existan las listas globales
  const listaTop = global.personajesTop || []
  const listaNormales = global.personajesNormales || []
  const todos = [...listaTop, ...listaNormales]

  // Buscar datos de personaje
  const obtenerInfo = (nombre) => {
    const p = todos.find(pp => pp.nombre.toLowerCase() === nombre.toLowerCase())
    if (!p) return { precio: 100000, rareza: '🌱 Básico' }

    const rareza = listaTop.some(pt => pt.nombre.toLowerCase() === nombre.toLowerCase())
      ? '👑 TOP'
      : p.precio >= 80000 ? '💎 Elite'
      : p.precio >= 60000 ? '⚔️ Medio'
      : '🌱 Básico'

    return { precio: p.precio, rareza }
  }

  let ranking = Object.entries(db)
    .filter(([_, u]) => Array.isArray(u.personajes) && u.personajes.length > 0)
    .map(([jid, u]) => {
      let total = 0
      const rarezas = { '👑 TOP': 0, '💎 Elite': 0, '⚔️ Medio': 0, '🌱 Básico': 0 }

      for (let p of u.personajes) {
        const { precio, rareza } = obtenerInfo(p)
        total += precio
        rarezas[rareza]++
      }

      return {
        jid,
        cantidad: u.personajes.length,
        gastado: total,
        rarezas
      }
    })
    .sort((a, b) => b.cantidad - a.cantidad) // orden por cantidad
    .slice(0, 10)

  if (ranking.length === 0) {
    return m.reply('❌ Aún nadie ha comprado personajes.')
  }

  let texto = `╭🎴 *RANKING DE COLECCIONISTAS* \n│\n`
  let menciones = []

  for (let i = 0; i < ranking.length; i++) {
    const { jid, cantidad, gastado, rarezas } = ranking[i]
    let name = 'Usuario'
    try {
      name = await conn.getName(jid)
    } catch (e) {
      name = '@' + jid.split('@')[0]
    }

    const medalla = i === 0 ? '🥇'
      : i === 1 ? '🥈'
      : i === 2 ? '🥉'
      : '🔹'

    texto += `│ ${medalla} *${i + 1}.* ${name}\n`
    texto += `│    🧩 Personajes: *${cantidad}*\n`
    texto += `│    💰 Gastado: *${gastado.toLocaleString()} monedas*\n`
    texto += `│    👑 ${rarezas['👑 TOP']}  💎 ${rarezas['💎 Elite']}  ⚔️ ${rarezas['⚔️ Medio']}  🌱 ${rarezas['🌱 Básico']}\n│\n`

    menciones.push(jid)
  }

  texto += '╰━━━━━━━━━━━━━━━━━━━╯\n'
  texto += '\n📈 Sigue comprando para subir posiciones.\n🛒 Usa *.comprar <nombre>*'

  conn.reply(m.chat, texto.trim(), m, {
    mentions: menciones
  })
}

handler.help = ['toppersonajes']
handler.tags = ['rpg', 'ranking']
handler.command = ['toppersonajes', 'topchars', 'toppsj']
handler.register = true
export default handler