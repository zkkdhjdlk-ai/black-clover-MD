//código creado x The Carlos 👑
//no olvides dejar créditos 
let handler = async (m, { text, usedPrefix, command }) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const regex = /^([a-zA-ZÀ-ÿñÑ\s]+)\.(\d{1,2})$/i
  const user = global.db.data.users[m.sender]

  if (user.registered === true) {
    return m.reply(`⚠️ Ya estás registrado, guerrero del Reino.
Usa *${usedPrefix}perfil* para ver tu grimorio.`)
  }

  if (!regex.test(text)) {
    return m.reply(`⚠️ Formato incorrecto. Usa: *${usedPrefix + command} Nombre.Edad*\n\nEjemplo:\n*${usedPrefix + command} Asta.18*`)
  }

  let [_, name, age] = text.match(regex)
  age = parseInt(age)

  if (age < 5 || age > 100) {
    return m.reply(`⚠️ Edad no válida. Debe estar entre 5 y 100 años.`)
  }

  // Datos aleatorios
  const generos = ['Masculino', 'Femenino']
  const paises = ['Clover', 'Diamond', 'Spade', 'Heart']
  const afinidades = ['🔥 Fuego', '💧 Agua', '🌪️ Viento', '🌱 Tierra', '⚡ Rayo', '🌑 Oscuridad', '🌞 Luz']
  const gender = generos[Math.floor(Math.random() * generos.length)]
  const country = paises[Math.floor(Math.random() * paises.length)]
  const afinidad = afinidades[Math.floor(Math.random() * afinidades.length)]
  const nivelMagico = Math.floor(Math.random() * 10) + 1
  const grimorioColor = gender === 'Masculino' ? '📕 Grimorio Carmesí' : '📘 Grimorio Índigo'

  // Guardar datos
  user.name = name.trim()
  user.age = age
  user.gender = gender
  user.country = country
  user.registered = true
  user.regTime = +new Date()
  user.afinidad = afinidad
  user.nivelMagico = nivelMagico

  // 🔥 ANIMACIÓN ÉPICA DE INVOCACIÓN 🔥
  await m.reply(`╔═━━━━━━━━━━◆◆◆━━━━━━━━━━═╗
║   ☠️ *𝐑𝐈𝐓𝐔𝐀𝐋 𝐃𝐄 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈Ó𝐍 𝐌Á𝐆𝐈𝐂𝐀* ☠️
╚═━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━═╝`)
  await delay(1400)

  await m.reply(`🔺 *Círculos arcanos giran lentamente bajo tus pies...*`)
  await delay(1200)

  await m.reply(`📜 *Runas antiguas comienzan a grabarse en el aire con fuego negro...*`)
  await delay(1200)

  await m.reply(`🔮 *La atmósfera se densifica... el grimorio te está observando...*`)
  await delay(1300)

  await m.reply(`🕯️ *𝓤𝓷 𝓰𝓻𝓲𝓶𝓸𝓻𝓲𝓸 𝓬𝓾𝓫𝓲𝓮𝓻𝓽𝓸 𝓭𝓮 𝓬𝓪𝓭𝓮𝓷𝓪𝓼 𝓬𝓪𝓮 𝓭𝓮𝓵 𝓬𝓲𝓮𝓵𝓸...*`)
  await delay(1500)

  await m.reply(`𓂀 𝓔𝓝𝓛𝓐𝓒𝓔 𝓐𝓒𝓣𝓘𝓥𝓐𝓓𝓞 𓂀 \n🩸 *El grimorio abre sus páginas por primera vez...*`)
  await delay(1500)

  await m.reply(`📖 *𝕰𝖑 𝕲𝖗𝖎𝖒𝖔𝖗𝖎𝖔 𝖍𝖆 𝖘𝖊𝖑𝖊𝖈𝖈𝖎𝖔𝖓𝖆𝖉𝖔 𝖆* *${name.toUpperCase()}*`)
  await delay(1000)

  await m.reply(`🌀 *𝕿𝖎𝖕𝖔 𝖉𝖊 𝕲𝖗𝖎𝖒𝖔𝖗𝖎𝖔:* ${grimorioColor}`)
  await delay(900)

  await m.reply(`🌌 *Afinidad Elemental:* ${afinidad}`)
  await delay(900)

  await m.reply(`💠 *Nivel Mágico Inicial:* ${nivelMagico}`)
  await delay(900)

  await m.reply(`🏰 *Reino de Origen:* ${country}`)
  await delay(900)

  await m.reply(`╔═━━━『 Black clover ⚔️』━━═╗
║  🕯️ Tu grimorio ahora está ligado a tu alma.
║  📜 ¡Úsalo sabiamente, o él te consumirá!
╚═━━━━━━━━━━━━━━━━━━━━━━━━━━━━═╝`)
  await m.react('🕯️')
}

handler.command ='reg', /^reg(ister|istrar)?$/i
export default handler