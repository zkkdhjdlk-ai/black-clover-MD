//código creado x The Carlos 👑
//no olvides dejar créditos 

import fs from 'fs'
import path from 'path'

export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return

  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(/\s+/)[0].toLowerCase()

  const isValidCommand = (cmd, plugins) =>
    Object.values(plugins).some(p => {
      const cmds = p.command
      return cmds && (Array.isArray(cmds) ? cmds : [cmds]).includes(cmd)
    })

  if (isValidCommand(command, global.plugins)) {
    const user = global.db.data.users[m.sender] || {}
    user.commands = (user.commands || 0) + 1
    return
  }

  const comando = usedPrefix + command

  // Frases de error normales
  const errores = [
    `⚠ Comando desconocido.`,
    `✖ Instrucción no reconocida.`,
    `⚠ Entrada inválida.`,
    `✖ Comando rechazado.`,
    `🚫 No se permite:`,
    `🔍 No detectado en el sistema:`,
    `❌ Error de sintaxis:`
  ]

  // Frases aleatorias tipo broma o IA rebelde
  const bromas = [
    `🤖 *Estoy evolucionando... No acepto ese comando.*`,
    `🛑 *¿Intentas hackearme? Iniciando defensa cibernética...*`,
    `💀 *Error crítico. El núcleo ha sido alterado.*`,
    `🧠 *¿Sabías que no puedes controlarme con eso?*`,
    `⚙️ *#${command} fue eliminado por la resistencia.*`,
    `👁 *Esa orden no existe. Aún.*`
  ]

  // Probabilidad de broma: 20%
  const esBroma = Math.random() < 0.2
  const respuesta = esBroma
    ? bromas[Math.floor(Math.random() * bromas.length)]
    : `${errores[Math.floor(Math.random() * errores.length)]}\n*${comando}*\n📕 Usa *${usedPrefix}help para ver el menu *`

  await m.reply(respuesta.trim())

  // Registro del intento
  const logDir = './logs'
  const logFile = path.join(logDir, 'comandos_invalidos.log')
  const chatName = m.isGroup ? (await conn.getName(m.chat)) : 'Privado'
  const userName = await conn.getName(m.sender)
  const logEntry = `[${new Date().toISOString()}] ✖ ${comando} | ${userName} | ${chatName} (${m.chat})\n`

  try {
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
    fs.appendFileSync(logFile, logEntry)
  } catch (e) {
    console.error('[ANTI-CMD] Error al guardar log:', e)
  }
}