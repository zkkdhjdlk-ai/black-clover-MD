let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  // Solo grupos
  if (!m.chat || !m.chat.endsWith('@g.us')) return false

  const chat = global.db?.data?.chats?.[m.chat]
  if (!chat || !chat.autoRechazar) return false

  // Si el bot no es admin no puede rechazar participantes
  if (!isBotAdmin) return true

  try {
    // extraer el número (sin @...)
    const senderNumber = (m.sender || '').split('@')[0]
    if (!senderNumber) return false

    const prefixes = ['6', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48']

    const shouldReject = prefixes.some(prefix => senderNumber.startsWith(prefix))
    if (!shouldReject) return false

    // Rechazar (si la API de tu versión usa otro nombre, dime y lo adapto)
    await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject')

    // Si quieres, puedes notificar al grupo (descomenta la línea siguiente)
    // await conn.sendMessage(m.chat, { text: `Se ha rechazado la solicitud del número +${senderNumber}` }, { quoted: m })

  } catch (err) {
    console.error('autoRechazar error:', err)
  }

  return false
}

export default handler