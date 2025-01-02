import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad* 🌸

- ♡⃝grupo 2
*❀* ${gp1}

- ♡⃝grupo 3
*❀* ${gp2}

- ✿:･comunidad THE LEGENDS✧･:
*❀* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ Enlace anulado? entre aquí! 

- ♡⃝THE LEGENDS 
*❀* ${channel}

- ✧┊┋◟black 𝐓𝐞𝐬𝐭◞┊┋✧
*❀* ${channel2}

> ${dev}`

await conn.sendFile(m.chat, miniurl, "yuki.jpg", grupos, m, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']
export default handler
