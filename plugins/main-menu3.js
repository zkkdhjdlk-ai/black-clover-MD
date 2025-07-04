let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]

  // ID(s) del owner desde configuración global
  const owners = global.owner.map(([id]) => id)
  const esReyMago = owners.includes(m.sender)
  const tituloEspecial = esReyMago ? '👑 *REY MAGO SUPREMO* 👑' : ''

  const menu = `
╭━━━〔 *📜 MENÚ RPG MÁGICO* 〕
┃🎮 *Comandos de Juego:*
┃🪙 .minar — Consigue minerales y monedas
┃🎁 .daily — Reclama tu recompensa diaria
┃❓ .preguntas — Trivia para ganar monedas
┃👊 .robar2 @user — Roba monedas a otro jugador
┃📦 .comprar <nombre> — Compra un personaje
┃📜 .pjs — Ver personajes disponibles
┃🧾 .mispersonajes — Ver tus personajes adquiridos
┃🧙 .banco — Muestra tu grimorio financiero
┃📤 .transferir
┃❔ .explorar 
┃🍀 .logros 
┃☠️ .sacrificar 
┃💸 .enviar @user <cantidad>
┃🤑 .cajamisteriosa
┃👑 .toppersonajes
┃⚔️ .trabajar
┃🧟‍♂️ .invasionzombie — Defiende la colección de la invasión zombie
┃👑 .reinado — Compite en el reinado mágico por poder y prestigio
┃🏹 .cazar — Caza criaturas mágicas para ganar premios
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 *📈 ESTADO ACTUAL* 〕
┃🧙‍♂️ Nivel de Magia: *${user.level || 0}*
┃✨ Exp: *${user.exp || 0}*
┃💰 Monedas: *${user.cookies?.toLocaleString() || 0} 🪙*
╰━━━━━━━━━━━━━━━━━━━━⬣

${tituloEspecial}
🧠 Usa los comandos con: *.comando* 
🌟 ¡Sigue avanzando para convertirte en *Rey Mago*!
`.trim()

  await conn.reply(m.chat, menu, m)
}

handler.help = ['menurpg']
handler.tags = ['rpg']
handler.command = ['menurpg', 'rpgmenu', 'menur']
handler.register = true
export default handler