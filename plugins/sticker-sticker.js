import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && ((q.msg || q).seconds > 8)) {
        return m.reply(`🥷 *¡El video no puede durar más de 8 segundos!*`)
      }

      let img = await q.download?.()
      if (!img) return m.reply(`👻 *No se pudo descargar el archivo. Envía primero una imagen, video o gif y luego usa el comando.*`, m)

      try {
        stiker = await sticker(img, false, global.packsticker, global.author)
      } catch (e) {
        let out
        if (/webp/g.test(mime)) out = await webp2png(img)
        else if (/image/g.test(mime)) out = await uploadImage(img)
        else if (/video/g.test(mime)) out = await uploadFile(img)
        if (typeof out !== 'string') out = await uploadImage(img)
        stiker = await sticker(false, out, global.packsticker, global.author)
      }

    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.author)
      } else {
        return m.reply(`🥀 *El enlace proporcionado no es válido.*`)
      }
    } else {
      return m.reply(`👻 *Envía o responde a una imagen/video/gif (menos de 8s) o proporciona un enlace válido para convertirlo en sticker.*`)
    }

  } catch (e) {
    console.error(e)
  } finally {
    if (stiker) {
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else {
      return m.reply(`👻 *No se pudo crear el sticker. Asegúrate de enviar una imagen, video o enlace válido.*`, m)
    }
  }
}

handler.help = ['sticker', 'stiker', 's'].map(v => v + ' <imagen|video|url>')
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.group = false
handler.register = true

export default handler

const isUrl = (text) => {
  return /^https?:\/\/.*\.(jpe?g|gif|png|webp)$/i.test(text)
}