import db from '../lib/database.js'

let handler = async (m, { args }) => {
  const user = global.db.data.users[m.sender]
  const wallet = user.monedas || 0
  const bank = user.bank || 0

  if (!args[0]) return m.reply('🚨 *Ingresa la cantidad de 🪙 Monedas que deseas depositar al banco.*\n\n💡 Usa: `depositar 500` o `depositar all`')
  
  if (args[0] === 'all') {
    if (wallet <= 0) return m.reply('🚫 *No tienes monedas disponibles en tu cartera.*')
    user.bank = (bank + wallet)
    user.monedas = 0
    return m.reply(`✅ *Has depositado TODAS tus 🪙 Monedas al banco.*\n\n🏦 Nuevo saldo en el banco: *${user.bank} 🪙*`)
  }

  let count = parseInt(args[0])
  if (isNaN(count) || count < 1) return m.reply('🚩 *La cantidad debe ser un número válido mayor que 0.*')
  if (wallet < count) return m.reply(`❌ *No tienes suficientes monedas.*\n💼 Cartera: *${wallet} 🪙*`)

  user.monedas -= count
  user.bank += count

  await m.reply(`✅ *Depositaste ${count} Monedas 🪙 al banco exitosamente.*\n🏦 Banco: *${user.bank} 🪙*\n💼 Cartera: *${user.monedas} 🪙*`)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'dep', 'aguardar']
handler.register = true
export default handler