let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    if (!m.chat.endsWith('@g.us')) return false

    let chat = global.db.data.chats[m.chat]
    if (!chat || !chat.autoAceptar) return false
    if (isAdmin) return false
    if (!isBotAdmin) return true 

    try {
        // Lista de solicitudes pendientes
        const pending = await conn.groupRequestParticipantsList(m.chat)

        const latinPrefix = '5'
        // Filtrar por prefijo del número
        const filtered = pending.filter(p =>
            p.id?.endsWith('@s.whatsapp.net') &&
            p.id.split('@')[0].startsWith(latinPrefix)
        )

        for (const p of filtered) {
            await conn.groupRequestParticipantsUpdate(m.chat, [p.id], 'approve')
        }

        // Detectar si este mensaje es una solicitud (eventos "stub")
        if (m.messageStubType === 172 && m.messageStubParameters?.length) {
            const [jid] = m.messageStubParameters
            if (jid.endsWith('@s.whatsapp.net') && jid.split('@')[0].startsWith(latinPrefix)) {
                await conn.groupRequestParticipantsUpdate(m.chat, [jid], 'approve')
            }
        }
    } catch (err) {
        console.error('Error aprobando solicitudes:', err)
    }
}

export default handler