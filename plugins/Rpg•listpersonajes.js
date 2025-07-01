// Lista completa de personajes 
function precioAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// TOP 10
const personajesTop = [
  { nombre: 'Cristo rey 👑', precio: 2000000, habilidad: '✝️ Resurrección divina y control de todo el universo. Es el personaje más caro de todos.' },
  { nombre: 'Arcangel 😇', precio: 1600000, habilidad: '🛡 Protección celestial y fuego sagrado.' },
  { nombre: 'The Carlos 🧠', precio: 1450000, habilidad: '💻 Maestro del código y hacker de grimorios.' },
  { nombre: 'Dios del Tiempo ⏳', precio: 1890000, habilidad: '🌀 Controla el tiempo y revierte el destino.' },
  { nombre: 'Dragon Legendario 🐉', precio: precioAleatorio(100000, 1872737), habilidad: '🔥 Fuego ancestral que consume reinos enteros.' },
  { nombre: 'Samurai Oscuro ⚔️', precio: precioAleatorio(100000, 1872737), habilidad: '🌑 Velo de sombras y técnica sin nombre.' },
  { nombre: 'Dios Guerrero 🪖', precio: precioAleatorio(100000, 1872737), habilidad: '🩸 Fuerza brutal y sed de batalla infinita.' },
  { nombre: 'Hechicero Supremo 🧙‍♂️', precio: precioAleatorio(100000, 1872737), habilidad: '🔮 Control total del espacio-tiempo.' },
  { nombre: 'Rey Gigante 👹', precio: precioAleatorio(100000, 1872737), habilidad: '🏔 Pisada que destruye ciudades.' },
  { nombre: 'Alma Fantasma 👻', precio: precioAleatorio(100000, 1872737), habilidad: '🌫 Intangibilidad y gritos del más allá.' }
]

// 190 comunes
const nombresComunes = [
  'Goku', 'Naruto', 'Sasuke', 'Luffy', 'Zoro', 'Sanji', 'Sakura', 'Hinata',
  'Tanjiro', 'Nezuko', 'Levi', 'Eren', 'Itachi', 'Madara', 'Kakashi',
  'Ichigo', 'Rukia', 'Byakuya', 'Saitama', 'Genos', 'Batman', 'Superman',
  'Iron Man', 'Spider-Man', 'Thanos', 'Deadpool', 'Shrek', 'Donkey', 'Elsa',
  'Anna', 'Simba', 'Scar', 'Woody', 'Buzz', 'Pikachu', 'Kirby', 'Link',
  'Zelda', 'Ash', 'Charizard', 'Mewtwo', 'Deku', 'Bakugo', 'Todoroki', 'All Might',
  'Gojo', 'Sukuna', 'Yuji', 'Megumi', 'Nobara', 'Asta', 'Yuno', 'Noelle', 'Yami',
  'Rem', 'Emilia', 'Subaru', 'Inuyasha', 'Sesshomaru', 'Sango', 'Kagome', 'Kirito',
  'Asuna', 'Sinon', 'Leafa', 'Jotaro', 'Dio', 'Josuke', 'Joseph', 'Polnareff',
  'Shinobu', 'Rengoku', 'Giyu', 'Akaza', 'Muzan', 'Eula', 'Diluc',
  'Klee', 'Zhongli', 'Venti', 'Raiden', 'Nahida', 'Albedo', 'Kazuha', 'Itto',
  'Xiao', 'Yoimiya', 'Ayaka', 'Tartaglia', 'Scaramouche', 'Furina', 'Clorinde',
  'Freminet', 'Cyno', 'Nilou', 'Baizhu', 'Alhaitham', 'Lynette', 'Lyney', 'Cheems',
  'Doge', 'Peppa Pig', 'Ben 10', 'Finn', 'Jake', 'Ice King', 'Marceline',
  'BMO', 'Steven', 'Garnet', 'Amethyst', 'Pearl', 'Connie', 'Lapis', 'Peridot',
  'SpongeBob', 'Patrick', 'Squidward', 'Mr. Krabs', 'Plankton', 'Sandy',
  'Rick', 'Morty', 'Summer', 'Beth', 'Jerry', 'Meg', 'Brian', 'Stewie',
  'Homer', 'Bart', 'Marge', 'Lisa', 'Maggie', 'Peter Griffin', 'Lois',
  'Goku Black', 'Zamasu', 'Beerus', 'Whis', 'Jiren', 'Broly', 'Cell', 'Buu',
  'Freezer', 'Gohan', 'Trunks', 'Vegeta Blue', 'Vegeta SSJ4', 'Gogeta', 'Vegito',
  'Majin Vegeta', 'Granola', 'Android 17', 'Android 18', 'Bardock', 'Raditz',
  'Hit', 'Cabba', 'Caulifla', 'Kale', 'Toppo', 'Dyspo', 'Roshi', 'Krillin',
  'Tien', 'Yamcha', 'ChiChi', 'Videl', 'Pan', 'Uub', 'Zeno', 'Grand Priest'
]

const personajesComunes = nombresComunes.slice(0, 190).map(nombre => ({
  nombre,
  precio: precioAleatorio(20000, 100000)
}))

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user.personajes) user.personajes = []

  const yaTiene = (nombre) =>
    user.personajes.includes(nombre.toLowerCase()) ? '✅' : ''

  const topTexto = personajesTop.map(p =>
`\`\`\`
🎖️ ${p.nombre} ${yaTiene(p.nombre)}
💰 ${p.precio.toLocaleString()} monedas
🧠 ${p.habilidad}
\`\`\``).join('\n')

  const comunesAgrupados = {
    '💎 Elite (80k - 100k)': [],
    '⚔️ Rango Medio (50k - 79k)': [],
    '🌱 Básico (20k - 49k)': []
  }

  for (const p of personajesComunes) {
    const tiene = yaTiene(p.nombre)
    const linea = `• ${p.nombre} ${tiene} — 💰 ${p.precio.toLocaleString()} monedas`

    if (p.precio >= 80000) comunesAgrupados['💎 Elite (80k - 100k)'].push(linea)
    else if (p.precio >= 50000) comunesAgrupados['⚔️ Rango Medio (50k - 79k)'].push(linea)
    else comunesAgrupados['🌱 Básico (20k - 49k)'].push(linea)
  }

  let comunesTexto = ''
  for (const [rango, lista] of Object.entries(comunesAgrupados)) {
    comunesTexto += `\n🌀 *${rango}*\n` + lista.join('\n') + '\n'
  }

  const texto = `
🎖️𝚃𝙾𝙿 𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙹𝙴𝚂 𝙼Á𝚂 𝙲𝙰𝚁𝙾𝚂 🤑
${topTexto}

🎭 𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙹𝙴𝚂 𝙲𝙾𝙼𝚄𝙽𝙴𝚂 📜
${comunesTexto}

🛍 Usa: *.comprar <nombre del personaje>*
`.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['listarpersonajes']
handler.tags = ['rpg', 'economia']
handler.command = ['listarpersonajes', 'personajes', 'pjs', 'chars']
handler.register = true
export default handler