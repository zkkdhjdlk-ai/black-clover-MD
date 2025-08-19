//código creado x The Carlos 👑
//no olvides dejar créditos 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🌟';
  const emoji2 = '⚠️';
  const moneda = 'monedas'; 
  let user = global.db.data.users[m.sender];

  
  const isOwner = global.owner?.map(v => v + '@s.whatsapp.net').includes(m.sender);
  if (isOwner) {
    user.premium = true;
    user.premiumTime = Infinity;
    return conn.reply(m.chat, `${emoji} *¡Eres el Gran Hechicero Supremo (Owner)!*\n🎖️ Tu membresía premium es *permanente*.`, m);
  }

  if (!text) {
    return conn.reply(
      m.chat,
      `${emoji2} *Indica la duración de la membresía.*\n\nEjemplo:\n${usedPrefix + command} 1 hora`,
      m
    );
  }

  let [amount, unit] = text.trim().split(' ');
  amount = parseInt(amount);
  unit = unit?.toLowerCase();

  if (isNaN(amount) || amount <= 0) {
    return conn.reply(m.chat, `${emoji2} *La cantidad debe ser un número positivo.*`, m);
  }

  const unidades = {
    minuto: 1,
    minutos: 1,
    hora: 60,
    horas: 60,
    dia: 1440,
    dias: 1440
  };

  if (!unit || !(unit in unidades)) {
    return conn.reply(m.chat, `${emoji2} *Unidad de tiempo no válida.* Usa: minutos, horas o días.`, m);
  }

  let minutos = amount * unidades[unit];

  if (minutos > 72000) {
    return conn.reply(m.chat, `${emoji2} *No puedes comprar más de 50 días de premium por vez.*\nIntenta con una duración menor.`, m);
  }

  // Costo actualizado
  let costo;
  if (unit.includes('hora') || unit.includes('minuto')) {
    costo = Math.ceil(minutos * (50000 / 60)); // 1 hora = 50,000 monedas
  } else if (unit.includes('dia')) {
    costo = Math.ceil(minutos / 1440) * 240000; // 1 día = 240,000 monedas
  }

  if ((user.cookies || 0) < costo) {
    return conn.reply(
      m.chat,
      `${emoji2} *No tienes suficientes monedas.*\nNecesitas *${costo.toLocaleString()} monedas* y tienes *${(user.cookies || 0).toLocaleString()} monedas*.`,
      m
    );
  }

  user.cookies -= costo;
  user.premium = true;
  user.premiumTime = Date.now() + minutos * 60 * 1000;

  return conn.reply(
    m.chat,
    `${emoji} *¡Compra completada con éxito!*\n🎖️ Ahora eres Premium por *${amount} ${unit}*.\n💰 Has gastado *${costo.toLocaleString()} ${moneda}*.\n\n🧙‍♂️ ¡La magia del grimorio te acompaña, caballero!`,
    m
  );
};

handler.help = ['comprarpremium <cantidad> <unidad>'];
handler.tags = ['premium'];
handler.command = ['comprarpremium', 'premium', 'vip'];
handler.register = true;

handler.before = async (m, { isOwner }) => {
  let user = global.db.data.users[m.sender];

  
  const ownerCheck = global.owner?.map(v => v + '@s.whatsapp.net').includes(m.sender);
  if (ownerCheck) {
    user.premium = true;
    user.premiumTime = Infinity;
    return;
  }

  
  if (user && user.premium && user.premiumTime && Date.now() > user.premiumTime) {
    user.premium = false;
    user.premiumTime = 0;
    await m.reply('⚠️ Tu membresía premium ha terminado. Compra otra para seguir disfrutando de los beneficios VIP.');
  }
};

export default handler;