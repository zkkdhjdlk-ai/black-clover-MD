const handler = async (m, { conn }) => {
  const db = global.db.data.users

  // Asegurar que existan las listas globales
  const listaTop = global.personajesTop || []
  const listaNormales = global.personajesComunes || []
  const todos = [...listaTop, ...listaNormales]

  // 🔧 Mapea por nombre normalizado (sin emojis)
  const normalizar = str => str.toLowerCase().replace(/[^a-z0-9]/gi, '').trim()

  // Crear mapa de rarezas por nombre
  const rarezaPorNombre = {}
  for (let p of todos) {
    const base = normalizar(p.nombre)
    const rareza = listaTop.includes(p) ? '👑 TOP'
      : p.precio >= 80000 ? '💎 Elite'
      : p.precio >= 60000 ? '⚔️ Medio'
      : '🌱 Básico'
    rarezaPorNombre[base] = { rareza, precio: p.precio }
  }

  // 🏆 Calcular ranking
  let ranking = Object.entries(db)
    .filter(([_, u]) => Array.isArray(u.personajes) && u.personajes.length > 0)
    .map(([jid, u]) => {
      let total = 0
      const rarezas = { '👑 TOP': 0, '💎 Elite': 0, '⚔️ Medio': 0, '🌱 Básico': 0 }

      for (let nombre of u.personajes) {
        const base = normalizar(nombre)
        const info = rarezaPorNombre[base] || { rareza: '🌱 Básico', precio: 100000 }
        rarezas[info.rareza]++
        total += info.precio
      }

      return {
        jid,
        cantidad: u.personajes.length,
        gastado: total,
        rarezas
      }
    })
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10)

  if (ranking.length === 0) return m.reply('❌ Aún nadie ha comprado personajes.')

  let texto = `╭🎴 *RANKING DE COLECCIONISTAS* \n│\n`
  let menciones = []

  for (let i = 0; i < ranking.length; i++) {
    const { jid, cantidad, gastado, rarezas } = ranking[i]
    let name = 'Usuario'
    try {
      name = await conn.getName(jid)
    } catch {
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

  conn.reply(m.chat, texto.trim(), m, { mentions: menciones })
}

handler.help = ['toppersonajes']
handler.tags = ['rpg', 'ranking']
handler.command = ['toppersonajes', 'topchars', 'toppsj']
handler.register = true
export default handler