let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  const cooldown = 10 * 60 * 1000 // 10 minutos
  const now = Date.now()

  // Inicialización segura
  if (!user.pickaxedurability) user.pickaxedurability = 100
  if (!user.pickaxerepair) user.pickaxerepair = 0
  if (!user.health) user.health = 100
  if (!user.cookies) user.cookies = 0
  if (!user.iron) user.iron = 0
  if (!user.gold) user.gold = 0
  if (!user.emerald) user.emerald = 0
  if (!user.coal) user.coal = 0
  if (!user.stone) user.stone = 0
  if (!user.exp) user.exp = 0

  // 🔧 Reparación automática del pico
  if (user.pickaxedurability <= 0) {
    if (now - user.pickaxerepair >= 2 * 60 * 60 * 1000) { // 2 horas
      user.pickaxedurability = 100
      user.pickaxerepair = 0
      return conn.reply(m.chat, '🔧 Tu pico se reparó automáticamente después de 2 horas. ¡Ya puedes volver a minar!', m)
    } else {
      const timeLeft = msToTime((2 * 60 * 60 * 1000) - (now - user.pickaxerepair))
      return conn.reply(m.chat, `❌ Tu pico está roto.\n⏳ Se reparará automáticamente en: *${timeLeft}*`, m)
    }
  }

  // Si está en cooldown
  if (user.lastmiming && now - user.lastmiming < cooldown) {
    const timeLeft = msToTime(cooldown - (now - user.lastmiming))
    return conn.reply(m.chat, `🪨 *Sistema de minería en enfriamiento*\n⏳ Vuelve en: *${timeLeft}*`, m)
  }

  // Requiere energía
  if (user.health < 50) return conn.reply(m.chat, '💢 Estás muy débil para minar. Recupera energía primero.', m)

  // Recursos aleatorios
  const cookies = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])
  const emerald = pickRandom([1, 5, 7, 8])
  const iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45])
  const gold = pickRandom([20, 5, 7, 8, 88, 40, 50])
  const coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100])
  const stone = pickRandom([200, 500, 700, 800, 900, 4000, 300])
  const hasil = pickRandom([200, 500, 800, 1000, 1300]) // experiencia

  // Aplicar recursos
  user.cookies += cookies
  user.iron += iron
  user.gold += gold
  user.emerald += emerald
  user.coal += coal
  user.stone += stone
  user.exp += hasil
  user.health -= 50
  user.pickaxedurability -= 30
  user.lastmiming = now

  // Si el pico se rompe, activar reparación automática
  if (user.pickaxedurability <= 0) {
    user.pickaxerepair = now
  }

  // Mensaje tipo RPG
  let msg = `
⛏️ *MINA DE DATOS ACTIVADA*

⚠️ *Excavación completada*:
  🍪 Cookies: *+${cookies}*
  💚 Esmeraldas: *+${emerald}*
  🔩 Hierro: *+${iron}*
  🏅 Oro: *+${gold}*
  🕋 Carbón: *+${coal}*
  🪨 Piedra: *+${stone}*
  ✨ Experiencia: *+${hasil}*

🔧 Pico: -30 durabilidad
❤️ Energía: -50 HP
📅 Tiempo restante: *10 minutos*
`.trim()

  await conn.reply(m.chat, msg, m)
  await conn.sendMessage(m.chat, { react: { text: '⛏️', key: m.key } })
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'mine', 'miming']
handler.register = true
export default handler

// Funciones auxiliares
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${h}h ${m}m ${s}s`
}