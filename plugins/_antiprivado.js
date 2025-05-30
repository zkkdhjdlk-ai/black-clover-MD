const TIEMPO_BLOQUEO_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.message || !m.text) return false;

    const text = m.text.toUpperCase();
    const exentos = ['PIEDRA', 'PAPEL', 'TIJERA', 'SERBOT', 'JADIBOT'];
    if (exentos.some(word => text.includes(word))) return true;

    const bot = global.db?.data?.settings?.[conn.user?.jid] || {};
    const user = global.db?.data?.users?.[m.sender] || {};

    // Si está bloqueado, verificar si ya puede ser perdonado
    if (user.bloqueado && user.tiempoBloqueo) {
      const ahora = Date.now();
      const tiempoPasado = ahora - user.tiempoBloqueo;

      if (tiempoPasado >= TIEMPO_BLOQUEO_MS) {
        await conn.updateBlockStatus(m.chat, 'unblock').catch(() => {});
        user.bloqueado = false;
        user.tiempoBloqueo = 0;
        user.warnPrivado = 0;

        await conn.sendMessage(m.chat, {
          text: `🔓 *¡El sello ha sido roto!*\n\n🌠 @${m.sender.split('@')[0]}, tus cadenas se han desvanecido...\n✨ Puedes volver a usar mis poderes.`,
          mentions: [m.sender]
        });
      } else {
        // ⛔ Castigado: bloquear comandos en grupos y privados
        if (m.isGroup) {
          await m.reply(`⚠️ *Castigo mágico activo*\n🧿 Aún quedan ${Math.ceil((TIEMPO_BLOQUEO_MS - tiempoPasado) / (60 * 60 * 1000))} horas para que @${m.sender.split('@')[0]} pueda volver a usar comandos.`, false, { mentions: [m.sender] });
        }
        return false; // Detiene el comando
      }
    }

    // Solo aplica advertencias si es por privado
    if (!m.isGroup && bot.antiPrivate && !isOwner && !isROwner) {
      user.warnPrivado = (user.warnPrivado || 0) + 1;

      if (user.warnPrivado >= 3) {
        const msgBloqueo = `
🧨 *¡SENTENCIA FINAL EJECUTADA!* 🧨
━━━━━━━━━━━━━━━━━━━━
🪄 Usuario: @${m.sender.split('@')[0]}
Has invocado el grimorio prohibido sin permiso.

🔒 *Bloqueado durante 2 días (privado y grupos)*.
⏳ Tu magia será sellada por completo.

📜 Busca redención aquí:
🌐 ${gp1}
━━━━━━━━━━━━━━━━━━━━`.trim();

        await m.reply(msgBloqueo, false, { mentions: [m.sender] });
        await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
        user.warnPrivado = 0;
        user.bloqueado = true;
        user.tiempoBloqueo = Date.now();
        return false;
      } else {
        const msgAdvertencia = `
⚠️ *¡ACCESO RESTRINGIDO!* ⚠️
━━━━━━━━━━━━━━━━━━━━
🧛‍♂️ @${m.sender.split('@')[0]}, no puedes contactar al grimorio sagrado por privado.

🔁 Advertencia ${user.warnPrivado}/3
🕳️ Al tercer intento, serás sellado por 2 días (privado + grupos).

📜 Únete al gremio oficial:
🌐 ${gp1}
━━━━━━━━━━━━━━━━━━━━`.trim();

        await m.reply(msgAdvertencia, false, { mentions: [m.sender] });
        return false;
      }
    }

    return true;

  } catch (e) {
    console.error('[❌ ERROR EN ANTI-PRIVADO Y GRUPAL]', e);
    return true;
  }
}