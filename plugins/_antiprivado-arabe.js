const codigosArabes = ['+212', '+971', '+20', '+966', '+964', '+963', '+973', '+968', '+974']; // Marruecos, EAU, Egipto, Arabia Saudita, Irak, Siria, Baréin, Omán, Catar
const regexArabe = /[\u0600-\u06FF]/; // Rango Unicode de letras árabes

export async function before(m, { conn, isOwner, isROwner }) {
  try {
    if (m.isBaileys || m.isGroup || !m.message || !m.sender || isOwner || isROwner) return false;

    const numero = m.sender;
    const texto = m.text || '';

    const tieneTextoArabe = regexArabe.test(texto);
    const tieneCodigoArabe = codigosArabes.some(pref => numero.startsWith(pref.replace('+', '')));

    if (tieneTextoArabe || tieneCodigoArabe) {
      await m.reply(`🛡️ *Protección activada*\n\n🚫 Usuario detectado con contenido o número sospechoso.\n🔒 Serás bloqueado automáticamente.`);
      await conn.updateBlockStatus(m.chat, 'block');
      console.log(`[🔒 BLOQUEO AUTOMÁTICO POR TEXTO/NÚMERO ÁRABE] ${numero}`);
      return false;
    }

    return true;

  } catch (e) {
    console.error('[❌ ERROR EN BLOQUEO AUTOMÁTICO ÁRABE]', e);
    return true;
  }
}