// código creado x The Carlos 👑
// comando: listar vip 

let handler = async (m, { conn }) => {
  const emoji = '🌟';
  const now = Date.now();

  // Obtener todos los usuarios VIP
  let vipUsers = Object.entries(global.db.data.users)
    .filter(([jid, user]) => user.premium && user.premiumTime);

  if (!vipUsers.length) {
    return conn.reply(m.chat, '🚩 No hay usuarios VIP/Premium activos.', m);
  }

  let message = `${emoji} *Lista de Usuarios VIP/Premium*\n\n`;

  vipUsers.forEach(([jid, user], index) => {
    let tiempoRestante = Math.max(user.premiumTime - now, 0);
    let status = tiempoRestante > 0 ? 'Activo' : 'Expirado';

    let dias = Math.floor(tiempoRestante / 86400000);
    let horas = Math.floor((tiempoRestante % 86400000) / 3600000);
    let minutos = Math.floor((tiempoRestante % 3600000) / 60000);

    let tiempoTexto = status === 'Activo' ? `${dias}d ${horas}h ${minutos}m` : '0d 0h 0m';

    message += `${index + 1}. @${jid.split('@')[0]} - Estado: ${status} - Tiempo restante: ${tiempoTexto}\n`;
  });

  await conn.sendMessage(
    m.chat,
    {
      text: message,
      mentions: vipUsers.map(u => u[0])
    },
    { quoted: m }
  );
};

handler.help = ['listavip'];
handler.tags = ['premium'];
handler.command = ['listavip', 'viplist', 'usuariosvip'];
handler.register = true;

export default handler;