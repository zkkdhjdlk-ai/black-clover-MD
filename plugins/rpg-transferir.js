//código creado x The Carlos 👑
//no olvides dejar créditos 
const impuesto = 0.02;

let handler = async (m, { conn, text }) => {
  let who = m.mentionedJid?.[0];
  if (!who) throw '🚨 *MENCIONA A UN USUARIO*\n📌 Usa: *@usuario cantidad*';

  let cantidadTexto = text.replace('@' + who.split`@`[0], '').trim();
  if (!cantidadTexto) throw '💰 *Debes indicar la cantidad de monedas a transferir.*';
  if (isNaN(cantidadTexto)) throw '❌ *Solo se permiten números.*';

  let monto = parseInt(cantidadTexto);
  if (monto <= 0) throw '⚠️ *La cantidad debe ser mayor que 0.*';

  let impuestoCobrado = Math.ceil(monto * impuesto);
  let total = monto + impuestoCobrado;

  let sender = m.sender;
  let userSender = global.db.data.users[sender];
  let userReceiver = global.db.data.users[who];

  if (!userSender || !userReceiver) throw '📂 *Uno de los usuarios no está registrado en el sistema.*';
  if (userSender.cookies < total)
    throw `😵‍💫 *Fondos insuficientes.*\n🪙 Tienes: *${userSender.cookies.toLocaleString()}*\n💸 Requieres: *${total.toLocaleString()}* (incluye impuesto)`;

  userSender.cookies -= total;
  userReceiver.cookies += monto;

  await m.reply(
    `✅ *Transferencia Exitosa*  
👤 Enviaste *${monto.toLocaleString()} monedas 🪙* a @${who.split('@')[0]}  
🧾 *Impuesto (2%)*: *${impuestoCobrado.toLocaleString()} monedas*  
📤 *Total descontado*: *${total.toLocaleString()} monedas*`,
    null,
    { mentions: [who] }
  );

  conn.fakeReply(
    m.chat,
    `📥 *Has recibido ${monto.toLocaleString()} monedas 🪙* de @${sender.split('@')[0]}!`,
    who,
    m.text
  );
};

handler.help = ['transferirmonedas *@user cantidad*'];
handler.tags = ['economia', 'rpg'];
handler.command = ['transferir', 'enviar', 'dar'];
handler.register = true;

export default handler;