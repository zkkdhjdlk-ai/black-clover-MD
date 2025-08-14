import axios from 'axios'
import baileys from '@whiskeysockets/baileys'

let handler = async (msg, { conn, text }) => {
  if (!text) return msg.reply(`🥷🏻 Por favor, escribe lo que deseas buscar en Pinterest.`)

  try {
    msg.react('🕒')
    let resultados = await buscarPins(text)

    if (!resultados.length) return conn.reply(msg.chat, `✧ No se encontraron resultados para "${text}".`, msg)

    const medios = resultados.slice(0, 10).map(img => ({ type: 'image', data: { url: img.hd } }))

    await conn.sendSylphy(msg.chat, medios, {
      caption: `🥷🏻 Pinterest - Búsqueda 🌪️\n\n✧ Consulta » "${text}"\n🌀 Resultados » ${medios.length}\n\n${dev}`,
      quoted: msg
    })

    await conn.sendMessage(msg.chat, { react: { text: '✅', key: msg.key } })
  } catch (err) {
    conn.reply(msg.chat, `⚠︎ Error:\n\n${err.message}`, msg)
  }
}

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ['dl']

export default handler

const buscarPins = async (consulta) => {
  try {
    const { data } = await axios.get(`https://api.stellarwa.xyz/search/pinterest?query=${encodeURIComponent(consulta)}`)

    if (data?.status && data?.data?.length) {
      return data.data.map(item => ({
        hd: item.hd,
        mini: item.mini
      }))
    }

    return []
  } catch (error) {
    console.error("Error al obtener imágenes de Pinterest:", error)
    return []
  }
}