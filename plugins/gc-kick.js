var handler = async (m, { conn, participants }) => {
    
    if (!m.mentionedJid[0] && !m.quoted) {
        return conn.reply(m.chat, '> _Responde un mensaje o etiqueta a la persona que quieres expulsar del grupo._', m);
    }

    
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

   
    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';

   
    const authorizedBots = [botNumber, ...global.owner.map(owner => owner[0] + '@s.whatsapp.net')];

   
    if (user === botNumber) {
        return conn.reply(m.chat, '🚩 No puedo eliminarme del grupo.', m);
    }

    if (user === ownerGroup) {
        return conn.reply(m.chat, '🚩 No puedo eliminar al propietario del grupo.', m);
    }

    if (authorizedBots.includes(user)) {
        return conn.reply(m.chat, '🚩 No puedo eliminar a un número autorizado del bot.', m);
    }

    const botIsAdmin = groupInfo.participants.some(p => p.id === botNumber && (p.admin === 'admin' || p.admin === 'superadmin'));
    if (!botIsAdmin) {
        return conn.reply(m.chat, '🚩 Necesito ser administrador para poder expulsar usuarios.', m);
    }

    try {
        // Ejecutar expulsión
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        conn.reply(m.chat, `✅ El usuario @${user.split('@')[0]} fue expulsado del grupo.`, m, { mentions: [user] });
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Ocurrió un error al intentar expulsar al usuario. Verifica que tengo permisos de administrador.', m);
    }
};

handler.help = ['kick @usuario'];
handler.tags = ['grupo'];
handler.command = ['kick', 'echar', 'sacar', 'ban'];
handler.admin = true;      
handler.group = true;     
handler.register = true;   
handler.botAdmin = true;    

export default handler;