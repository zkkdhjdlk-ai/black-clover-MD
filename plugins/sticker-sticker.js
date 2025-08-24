import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
  let stiker = null
  try {
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || quoted.mediaType || ''

    if (/webp|image|video/g.test(mime)) {
      // Verifica duración del video
      if (/video/.test(mime) && ((quoted.msg || quoted).seconds > 8)) {
        return m.reply('⚠️ *El video no puede durar más de 8 segundos.*')
      }

      const media = await quoted.download()
      if (!media) return m.reply('❌ *No se pudo descargar el archivo. Asegúrate de responder a una imagen/video o gif.*')

      try {
        // Intento principal para crear el sticker
        stiker = await sticker(media, false, global.packsticker || 'Bot-Stickers', global.author || 'By SubBot')
      } catch (e) {
        console.error('⚠️ Error al generar sticker directamente:', e)
        // Intento alternativo según el tipo de archivo
        let out
        if (/webp/.test(mime)) out = await webp2png(media)
        else if (/image/.test(mime)) out = await uploadImage(media)
        else if (/video/.test(mime)) out = await uploadFile(media)
        if (typeof out !== 'string') out = await uploadImage(media)

        stiker = await sticker(false, out, global.packsticker || 'Bot-Stickers', global.author || 'By SubBot')
      }

    } else if (args[0]) {
      // Si es un enlace directo
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker || 'Bot-Stickers', global.author || 'By SubBot')
      } else {
        return m.reply('📛 *El enlace proporcionado no es válido.*')
      }
    } else {
      return m.reply('📌 *Envía o responde a una imagen/video/gif (máx 8s) o proporciona un enlace válido.*')
    }

  } catch (e) {
    console.error('❌ Error al crear el sticker:', e)
    return m.reply('⚠️ *Ocurrió un error inesperado al intentar crear el sticker.*')
  }

  if (stiker) {
    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } else {
    return m.reply('❌ *No se pudo crear el sticker. Intenta con otro archivo o revisa que el formato sea válido.*')
  }
}

handler.help = ['sticker', 'stiker', 's'].map(v => v + ' <imagen|video|url>')
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.group = false
handler.register = true

export default handler

// Validador de URLs de imágenes
function isUrl(text) {
  return /^https?:\/\/.*\.(jpe?g|gif|png|webp)$/i.test(text)
}