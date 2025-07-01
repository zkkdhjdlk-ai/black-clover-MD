// Lista completa de personajes 
function precioAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Personajes TOP (con Cristo Rey como el más caro)
const personajesTop = [
  { nombre: 'Cristo rey 👑', precio: 2000000, habilidad: '✝️ Resurrección divina y control de todo el universo. Es el personaje más caro de todos.' },
  { nombre: 'Arcangel 😇', precio: 1600000, habilidad: '🛡 Protección celestial y fuego sagrado.' },
  { nombre: 'The Carlos 🧠', precio: 1450000, habilidad: '💻 Maestro del código y hacker de grimorios.' },
  { nombre: 'Dios del Tiempo ⏳', precio: 2333443, habilidad: '🌀 Controla el tiempo y revierte el destino.' },
  { nombre: 'Dragon Legendario 🐉', precio: precioAleatorio(100000, 1872737), habilidad: '🔥 Fuego ancestral que consume reinos enteros.' },
  { nombre: 'Samurai Oscuro ⚔️', precio: precioAleatorio(100000, 1872737), habilidad: '🌑 Velo de sombras y técnica sin nombre.' },
  { nombre: 'Dios Guerrero 🪖', precio: precioAleatorio(100000, 1872737), habilidad: '🩸 Fuerza brutal y sed de batalla infinita.' },
  { nombre: 'Hechicero Supremo 🧙‍♂️', precio: precioAleatorio(100000, 1872737), habilidad: '🔮 Control total del espacio-tiempo.' },
  { nombre: 'Rey Gigante 👹', precio: precioAleatorio(100000, 1872737), habilidad: '🏔 Pisada que destruye ciudades.' },
  { nombre: 'Alma Fantasma 👻', precio: precioAleatorio(100000, 1872737), habilidad: '🌫 Intangibilidad y gritos del más allá.' }
]

// Personajes comunes
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

const personajes = {}

// Agregar comunes (hasta 190)
nombresComunes.slice(0, 190).forEach(n => personajes[n.toLowerCase()] = precioAleatorio(20000, 100000))

// Agregar TOP
personajesTop.forEach(p => personajes[p.nombre.toLowerCase()] = p.precio)

let handler = async (m, { args, conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user) return m.reply('🚫 Usuario no registrado.')

  if (!args[0]) return m.reply('🚩 Usa: *.comprar <nombre_del_personaje>*')

  const nombreRaw = args.join(' ').toLowerCase()
  const precio = personajes[nombreRaw]

  if (!precio) {
    return m.reply(`❌ El personaje "${nombreRaw}" no está en la tienda.\nConsulta *.pjs*`)
  }

  if (!user.personajes) user.personajes = []

  if (user.personajes.includes(nombreRaw)) {
    return m.reply(`😅 Ya tienes a *${nombreRaw}*.`)
  }

  if (user.cookies < precio) {
    return m.reply(`🪙 No tienes suficientes monedas.\n💰 Precio: ${precio.toLocaleString()}\n👜 Tienes: ${user.cookies.toLocaleString()}`)
  }

  user.cookies -= precio
  user.personajes.push(nombreRaw)

  let extra = ''
  if (nombreRaw.includes('cristo')) {
    extra = '\n✨ Has adquirido el personaje *más caro del universo mágico* 🙏👑'
  }

  return m.reply(`✅ Compraste a *${nombreRaw}* por ${precio.toLocaleString()} monedas 🪙${extra}`)
}

handler.help = ['comprar <personaje>']
handler.tags = ['economia', 'rpg']
handler.command = ['comprar', 'buy']
handler.register = true
export default handler