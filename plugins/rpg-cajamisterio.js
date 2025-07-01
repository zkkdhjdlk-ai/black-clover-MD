
// Respeten credito xddddd (ratas inmundas)
let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  const cooldown = 1000 * 60 * 30 // 30 minutos
  const tiempoRestante = cooldown - (new Date() - (user.lastbox || 0))

  if (tiempoRestante > 0) {
    let minutos = Math.floor(tiempoRestante / 60000)
    let segundos = Math.floor((tiempoRestante % 60000) / 1000)
    return m.reply(`⏳ Espera *${minutos}m ${segundos}s* para abrir otra caja misteriosa.`)
  }

  let premio = Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000 // 10k a 1M
  let especial = Math.random() < 0.01 // 1% probabilidad

  if (especial) {
    premio += 777777 // bonus especial
    m.reply(`🎉 *¡SUERTE LEGENDARIA!* 🎉\n\nGanaste el premio misterioso de 💰 *${premio.toLocaleString()} monedas* 🪙`)
  } else {
    m.reply(`🎁 *¡Has abierto una Caja Misteriosa!*\n💰 Has ganado: *${premio.toLocaleString()} monedas* 🪙`)
  }

  user.cookies = (user.cookies || 0) + premio
  user.lastbox = new Date() * 1
}

handler.help = ['cajamisteriosa']
handler.tags = ['juegos', 'economia', 'rpg']
handler.command = ['cajamisteriosa', 'box', 'suerte']
handler.register = true
export default handler