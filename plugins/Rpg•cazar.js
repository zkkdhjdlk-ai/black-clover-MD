let handler = async (m, { conn }) => {
  const objetos = ['🐗 Jabalí', '🐍 Serpiente', '🐺 Lobo', '🐉 Dragón', '🦅 Águila', '🐰 Conejo']
  const resultado = objetos[Math.floor(Math.random() * objetos.length)]
  const recompensa = Math.floor(Math.random() * 15000) + 5000

  global.db.data.users[m.sender].cookies += recompensa

  return m.reply(`🏹 ¡Has cazado un ${resultado}!\n💰 Recompensa: *${recompensa.toLocaleString()} monedas*`)
}

handler.command = ['cazar', 'hunt']
handler.tags = ['rpg']
handler.help = ['cazar']
export default handler