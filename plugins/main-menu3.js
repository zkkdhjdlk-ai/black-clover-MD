let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]

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
┃📤 .minar 
┃💸 .enviar @user <cantidad>
┃ 🤑.cajamisteriosa 
┃👑.toppersonajes
┃⚔️.trabajar 
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 *📈 ESTADO ACTUAL* 〕
┃🧙‍♂️ Nivel de Magia: *${user.level || 0}*
┃✨ Exp: *${user.exp || 0}*
┃💰 Monedas: *${user.cookies?.toLocaleString() || 0} 🪙*
╰━━━━━━━━━━━━━━━━━━━━⬣

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