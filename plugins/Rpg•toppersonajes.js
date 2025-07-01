let handler = async (m, { conn }) => {
  const db = global.db.data.users

  let ranking = Object.entries(db)
    .filter(([_, u]) => Array.isArray(u.personajes) && u.personajes.length > 0)
    .map(([jid, u]) => ({ jid, total: u.personajes.length }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  if (ranking.length === 0) {
    return m.reply('❌ Aún nadie ha comprado personajes.')
  }

  let texto = `🎭 *TOP USUARIOS CON MÁS PERSONAJES*\n\n`

  for (let i = 0; i < ranking.length; i++) {
    const { jid, total } = ranking[i]
    let name = 'Usuario'
    try {
      name = await conn.getName(jid)
    } catch (e) {
      name = '@' + jid.split('@')[0]
    }
    texto += `*${i + 1}.* ${name} — 🎭 *${total} personaje(s)*\n`
  }

  m.reply(texto.trim())
}

handler.help = ['toppersonajes']
handler.tags = ['rpg', 'ranking']
handler.command = ['toppersonajes', 'topchars', 'toppsj']
handler.register = true
export default handler