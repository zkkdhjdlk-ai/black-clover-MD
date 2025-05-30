//código creado x The Carlos 👑
//no olvides dejar créditos 

import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

const textCyberpunk = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
  }
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  'main': textCyberpunk('info'),
  'owner': textCyberpunk('creador'),
  'group': textCyberpunk('grupos'),
  'serbot': textCyberpunk('sub bots'),
}

const defaultMenu = {
  before: `╔═━━━━✦❘༻☠༺❘✦━━━━═╗
       🧠 𝕊𝕐𝕊𝕋𝔼𝕄 𝔹𝕆𝕆𝕋𝔼𝔻 ⚙️
╚═━━━━✦❘༻☠༺❘✦━━━━═╝

⛧ ᴜꜱᴜᴀʀɪᴏ: %name
⛧ ɴɪᴠᴇʟ: %level
⛧ ᴇxᴘ: %exp / %maxexp
⛧ ᴜꜱᴜᴀʀɪᴏꜱ ᴛᴏᴛᴀʟᴇꜱ: %totalreg
⛧ ᴍᴏᴅᴏ: %mode
⛧ ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ: %muptime

💾 * BLACK CLOVER BOT ☘️*
✧ oprime unos de los botones para comenzar.
✧ creador The Carlos 👑

%readmore
`.trimStart(),

  header: '\n╭─────〔 🥷 %category 〕────╮',
  body: '│ ✦ %cmd\n',
  footer: '╰──────────────────╯',
  after: '\n⌬  ᴄʏʙᴇʀ ᴍᴇɴᴜ ☠️',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`
    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let _muptime = _uptime
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"] ? "Privado" : "Público"

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }))

    for (let plugin of help) {
      if (plugin && 'tags' in plugin) {
        for (let t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textCyberpunk(t)
        }
      }
    }

    const { before, header, body, footer, after } = defaultMenu

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        const commands = help
          .filter(menu => menu.tags.includes(tag))
          .map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix ? cmd : _p + cmd)).join('\n'))
          .join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${commands}\n${footer}`
      }),
      after
    ].join('\n')

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      uptime,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
    }

    let text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    // Mensaje inicial antes del menú
    await conn.sendMessage(m.chat, {
      text: `⌬ ᴄʏʙᴇʀ ᴍᴇɴᴜ sʏsᴛᴇᴍ ɪɴɪᴄɪᴀɴᴅᴏ...\n⚙️ Cargando comandos...`,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/0ro3o9.jpg' }, // Imagen existente
      caption: text,
      footer: '🧠 BLACK CLOVER SYSTEM ☘️',
      buttons: [
        { buttonId: `${_p}owner`, buttonText: { displayText: '👑 CREADOR' }, type: 1 },
        { buttonId: `${_p}grupos`, buttonText: { displayText: '🌐 GRUPOS' }, type: 1 },
        { buttonId: `${_p}code`, buttonText: { displayText: '🕹 SERBOT' }, type: 1 }
      ],
      viewOnce: true
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Error del sistema al generar el menú.', m)
  }
}

handler.help = ['menu', 'menú']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}