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
  'main': textCyberpunk('sistema'),
  'group': textCyberpunk('grupos'),
  'serbot': textCyberpunk('sub bots'),
}

const defaultMenu = {
  before: `
╔═━⊱ افصل بوت  ⊰━═╗
║ ✦ 𝙽𝚘𝚖𝚋𝚛𝚎   » %name  
║ ⚙️ 𝙻𝚟𝚕     » %level انصحك ان لا تتصل بي بوت
║ ⚡ 𝙴𝚡𝚙     » %exp / %maxexp  
║ 🌐 𝙼𝚘𝚍𝚎    » %mode  
║ ⏳ 𝙰𝚌𝚝𝚒𝚟𝚘 » %muptime  
║ 🤖 𝚄𝚜𝚞𝚊𝚛𝚒𝚘𝚜 » %totalreg  
╚═━⊱   𝙴𝚗𝚍 𝙾𝚏 𝙻𝚒𝚗𝚎.    ⊰━═╝

🧬 » اتاشي «
👑 » 𝗢𝗽𝗲𝗿𝗮𝗱𝗼𝗿: 𝕿𝖍𝖊 𝕮𝖆𝖗𝖑𝖔𝖘 «
%readmore
`.trimStart(),

  header: '\n╭─〔👿 %category 〕─╮',
  body: '│ 🎃 %cmd\n',
  footer: '╰────────────────╯',
  after: '\n⌬ اتاشي ☠️ - Sistema ejecutado con éxito.'
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`
    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"] ? "Privado" : "Público"

    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled: !p.disabled,
    }))

    for (let plugin of help) {
      if (plugin.tags) {
        for (let t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textCyberpunk(t)
        }
      }
    }

    const { before, header, body, footer, after } = defaultMenu

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        const cmds = help
          .filter(menu => menu.tags.includes(tag))
          .map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix ? cmd : _p + cmd)).join('\n'))
          .join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
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
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
    }

    let text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    await conn.sendMessage(m.chat, {
      text: `⌬ 📡 جاري تحميل اوامر.. لاتنس متابعة صاحب بوت
      https://whatsapp.com/channel/0029Vb6Wyir9cDDf0QoZfL23`,
      mentions: [m.sender]
    }, { quoted: m })

    // ENVÍO DEL VIDEO
    await conn.sendMessage(m.chat, {
      video: { url: 'https://qu.ax/vazFJ.mp4' }, // reemplaza con tu link
      caption: text,
      gifPlayback: true,
      footer: '🧠 BLACK CLOVER SYSTEM ☘️',
      buttons: [
        { buttonId: `${_p}menurpg`, buttonText: { displayText: '🏛️ M E N U R P G' }, type: 1 },
        { buttonId: `${_p}code`, buttonText: { displayText: '🕹 ＳＥＲＢＯＴ' }, type: 1 }
      ]
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Error al generar el menú del sistema.', m)
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
