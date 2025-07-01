// Lista completa de personajes 
function precioAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Personajes TOP
const personajesTop = [
  { nombre: 'Cristo rey 👑', precio: 1872737, habilidad: '✝️ Resurrección divina y control de todo el universo.' },
  { nombre: 'arcangel 😇', precio: 1600000, habilidad: '🛡 Protección celestial y fuego sagrado.' },
  { nombre: 'the carlos 🧠', precio: 1450000, habilidad: '💻 Maestro del código y hacker de grimorios.' },
  { nombre: 'dragon legendario 🐉', precio: precioAleatorio(100000, 1872737), habilidad: '🔥 Fuego ancestral que consume reinos enteros.' },
  { nombre: 'samurai oscuro ⚔️', precio: precioAleatorio(100000, 1872737), habilidad: '🌑 Velo de sombras y técnica sin nombre.' },
  { nombre: 'dios_guerrero 🪖', precio: precioAleatorio(100000, 1872737), habilidad: '🩸 Fuerza brutal y sed de batalla infinita.' },
  { nombre: 'hechicero supremo 🧙‍♂️', precio: precioAleatorio(100000, 1872737), habilidad: '🔮 Control total del espacio-tiempo.' },
  { nombre: 'rey gigante 👹', precio: precioAleatorio(100000, 1872737), habilidad: '🏔 Pisada que destruye ciudades.' },
  { nombre: 'alma_fantasma 👻', precio: precioAleatorio(100000, 1872737), habilidad: '🌫 Intangibilidad y gritos del más allá.' },
  { nombre: 'reina de las llamas 🔥', precio: precioAleatorio(100000, 1872737), habilidad: '👑 Control absoluto del fuego místico.' }
]

// Personajes comunes con precios aleatorios
const nombresComunes = [
  'Goku', 'Naruto', 'Sasuke', 'Luffy', 'Zoro', 'Sanji', 'Sakura', 'Hinata',
  'Tanjiro', 'Nezuko', 'Levi', 'Eren', 'Itachi', 'Madara', 'Kakashi',
  'Ichigo', 'Rukia', 'Byakuya', 'Saitama', 'Genos', 'Batman', 'Superman',
  'Iron Man', 'Spider-Man', 'Thanos', 'Deadpool', 'Shrek', 'Donkey', 'Elsa',
  'Anna', 'Simba', 'Scar', 'Woody', 'Buzz Lightyear', 'Pikachu', 'Kirby', 'Link', 'Zelda'
]

const personajesNormales = nombresComunes.map(nombre => ({
  nombre,
  precio: precioAleatorio(20000, 100000)
}))

const handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user.personajes) user.personajes = []

  const yaTiene = (nombre) =>
    user.personajes.includes(nombre.toLowerCase()) ? ' ✅' : ''

  // Ordenar personajes normales por precio descendente
  const normalesOrdenados = personajesNormales
    .sort((a, b) => b.precio - a.precio)

  const bloquesPorPrecio = normalesOrdenados.reduce((acc, personaje) => {
    const rango = personaje.precio >= 80000
      ? '💎 Elite (80k - 100k)'
      : personaje.precio >= 50000
        ? '⚔️ Rango Medio (50k - 79k)'
        : '🌱 Básico (20k - 49k)'

    if (!acc[rango]) acc[rango] = []
    acc[rango].push(personaje)
    return acc
  }, {})

  // Bloque Top Caros
  const topTexto = personajesTop.map(p => 
`\`\`\`
🎖️ ${p.nombre}${yaTiene(p.nombre)}
— 💰 ${p.precio.toLocaleString()} monedas
🧠 Poder: ${p.habilidad}
\`\`\``).join('\n')

  // Bloques agrupados por rango
  let comunesTexto = ''
  for (const [rango, lista] of Object.entries(bloquesPorPrecio)) {
    comunesTexto += `\n🌀 *${rango}*\n`
    comunesTexto += lista.map((p, i) =>
      `• ${p.nombre}${yaTiene(p.nombre)} — 💰 ${p.precio.toLocaleString()} monedas`
    ).join('\n') + '\n'
  }

  const texto = `『𝚃𝙾𝙿  𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙹𝙴𝚂 𝙼Á𝚂 𝙲𝙰𝚁𝙾𝚂 🤑 』

${topTexto}

『 🎭 𝙿𝙴𝚁𝚂𝙾𝙽𝙰𝙹𝙴𝚂 𝙲𝙾𝙼𝚄𝙽𝙴𝚂  』

${comunesTexto}

💡 Usa: *.comprar <nombre>*
`.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['listarpersonajes']
handler.tags = ['rpg', 'economia']
handler.command = ['listarpersonajes', 'personajes', 'pjs', 'chars']
handler.register = true
export default handler