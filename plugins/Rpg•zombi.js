const handler = async (m, { conn, args }) => {
  const db = global.db.data
  if (!db.invasion) {
    db.invasion = {
      zombies: 150,
      progreso: 0,
      jugadoresDefendiendo: []
    }
  }
  const invasion = db.invasion
  const user = db.users[m.sender]
  user.personajes = user.personajes || []

  const chatIdNotificaciones = '1234567890-@g.us' // Cambia al grupo donde quieras notificaciones

  // Mostrar estado
  if (args[0] === 'estado') {
    return conn.reply(m.chat, `🧟‍♂️ *Estado actual de la Invasión Zombie*\n\n` +
      `Zombies restantes: *${invasion.zombies}*\n` +
      `Progreso: *${invasion.progreso}%*\n` +
      `Defensores activos: *${invasion.jugadoresDefendiendo.length}*`, m)
  }

  if (invasion.zombies <= 0) {
    return conn.reply(m.chat, '🏆 La invasión zombie ya fue derrotada, ¡gracias por tu ayuda!', m)
  }

  // Ataque del usuario
  const ataque = Math.floor(Math.random() * 25) + 15
  invasion.zombies = Math.max(0, invasion.zombies - ataque)

  if (!invasion.jugadoresDefendiendo.includes(m.sender)) {
    invasion.jugadoresDefendiendo.push(m.sender)
  }

  // Riesgo de perder personaje (7%)
  let perdida = ''
  if (user.personajes.length > 0 && Math.random() < 0.07) {
    const idx = Math.floor(Math.random() * user.personajes.length)
    const perdido = user.personajes.splice(idx, 1)[0]
    perdida = `💀 Perdiste a *${perdido}* durante la invasión.\n`
  }

  // Actualizar progreso
  invasion.progreso = Math.min(100, Math.floor((150 - invasion.zombies) / 1.5))

  let texto = `🧟‍♂️ *Invasión Zombie*\n\n` +
    `🧟 Zombies restantes: *${invasion.zombies}*\n` +
    `⚔️ Defendiste atacando a *${ataque}* zombies.\n` +
    `${perdida}` +
    `📊 Progreso: *${invasion.progreso}%*\n\n`

  // Mensajes especiales y reinicio
  if (invasion.zombies === 0) {
    texto += `🏆 ¡La invasión zombie fue derrotada gracias a los magos! 🎉\n` +
      `Se otorgarán recompensas a los defensores.`
    invasion.jugadoresDefendiendo.forEach(jid => {
      const u = db.users[jid]
      if (!u) return
      const premio = 30000 + Math.floor(Math.random() * 20000) // 30k-50k monedas
      u.money = (u.money || 0) + premio
    })
    // Notificar grupo
    await conn.sendMessage(chatIdNotificaciones, texto)
    // Reiniciar invasión con dificultad aleatoria
    invasion.zombies = Math.floor(Math.random() * 150) + 100
    invasion.progreso = 0
    invasion.jugadoresDefendiendo = []
    return
  } else if (invasion.zombies <= 20) {
    await conn.sendMessage(chatIdNotificaciones, `⚠️ La invasión zombie está casi derrotada. ¡Últimos ${invasion.zombies} zombies! Usa *.invasionzombie* para ayudar.`)
  }

  return conn.reply(m.chat, texto, m)
}

// Comando para resetear la invasión (solo admins)
handler.reset = async (m, { conn }) => {
  if (!global.owner.includes(m.sender)) return m.reply('❌ No tienes permiso para resetear la invasión.')
  const db = global.db.data
  db.invasion = {
    zombies: Math.floor(Math.random() * 150) + 100,
    progreso: 0,
    jugadoresDefendiendo: []
  }
  m.reply('✅ Invasión zombie reseteada con nueva dificultad.')
}

handler.help = ['invasion', 'invasionzombie estado']
handler.tags = ['rpg', 'evento']
handler.command = ['invasionzombie']
handler.register = true
export default handler