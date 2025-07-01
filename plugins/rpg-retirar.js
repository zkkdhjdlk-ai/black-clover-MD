import db from '../lib/database.js'

let handler = async (m, { args }) => {
  const user = global.db.data.users[m.sender]
  const bank = user.bank || 0
  const wallet = user.monedas || 0

  if (!args[0]) return m.reply('🏦 *Indica cuántas 🪙 Monedas deseas retirar del banco.*\n\n💡 Usa: `retirar 500` o `retirar all`')

  if (args[0] === 'all') {
    if (bank <= 0) return m.reply('🚫 *No tienes monedas guardadas en el banco.*')
    user.monedas = wallet + bank
    user.bank = 0
    return m.reply(`✅ *Retiraste TODAS tus 🪙 Monedas del banco.*\n\n💼 Cartera: *${user.monedas} 🪙*`)
  }

  let count = parseInt(args[0])
  if (isNaN(count) || count < 1) return m.reply('🚩 *La cantidad debe ser un número válido mayor que 0.*')
  if (bank < count) return m.reply(`❌ *No tienes suficientes monedas en el banco.*\n🏦 Banco: *${bank} 🪙*`)

  user.bank -= count
  user.monedas += count

  await m.reply(`✅ *Retiraste ${count} Monedas 🪙 del banco exitosamente.*\n💼 Cartera: *${user.monedas} 🪙*\n🏦 Banco: *${user.bank} 🪙*`)
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'wd']
handler.register = true
export default handler