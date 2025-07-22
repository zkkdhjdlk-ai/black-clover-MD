const handler = async (m, { conn, args, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender]
  if (!user.personajes) user.personajes = []

  if (!args[0]) {
    return conn.reply(m.chat, `❌ *Debes especificar el nombre del personaje que deseas comprar.*\n\n📌 Uso: *${usedPrefix + command} <nombre del personaje>*`, m)
  }

  const nombreBuscado = args.join(' ').toLowerCase()

  // Personajes TOP (épicos)
  const personajesTop = [
    { nombre: 'Cristo rey 👑', precio: 20000000 },
    { nombre: 'Arcangel Supremo 😇', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'The Carlos 🧠', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Dios del Tiempo ⏳', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Dragón Ancestral 🐉', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Samurai de la Sombra ⚔️', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Dios Guerrero 🪖', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Hechicero Supremo 🧙‍♂️', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Titán del Infinito 👹', precio: precioAleatorio(5000000, 9999999) },
    { nombre: 'Alma del Vacío 👻', precio: precioAleatorio(5000000, 9999999) }
  ]

  // Personajes comunes
  const nombresComunes = [
    'Goku','Naruto','Sasuke','Luffy','Zoro','Sanji','Sakura','Hinata',
    'Tanjiro','Nezuko','Levi','Eren','Itachi','Madara','Kakashi',
    'Ichigo','Rukia','Byakuya','Saitama','Genos','Batman','Superman',
    'Iron Man','Spider-Man','Thanos','Deadpool','Shrek','Donkey','Elsa',
    'Anna','Simba','Scar','Woody','Buzz','Pikachu','Kirby','Link',
    'Zelda','Ash','Charizard','Mewtwo','Deku','Bakugo','Todoroki','All Might',
    'Gojo','Sukuna','Yuji','Megumi','Nobara','Asta','Yuno','Noelle','Yami',
    'Rem','Emilia','Subaru','Inuyasha','Sesshomaru','Sango','Kagome','Kirito',
    'Asuna','Sinon','Leafa','Jotaro','Dio','Josuke','Joseph','Polnareff',
    'Shinobu','Rengoku','Giyu','Akaza','Muzan','Eula','Diluc',
    'Klee','Zhongli','Venti','Raiden','Nahida','Albedo','Kazuha','Itto',
    'Xiao','Yoimiya','Ayaka','Tartaglia','Scaramouche','Furina','Clorinde',
    'Freminet','Cyno','Nilou','Baizhu','Alhaitham','Lynette','Lyney','Cheems'
  ].slice(0, 100)

  const personajesComunes = nombresComunes.map(nombre => ({
    nombre,
    precio: precioAleatorio(20000, 100000)
  }))

  // Unir todos
  const todos = [...personajesTop, ...personajesComunes]

  // Buscar personaje
  const personaje = todos.find(p => p.nombre.toLowerCase() === nombreBuscado)

  if (!personaje) {
    return conn.reply(m.chat, `❌ *No se encontró el personaje "${args.join(' ')}" en la tienda.*\nUsa *.listarpersonajes* para ver los disponibles.`, m)
  }

  if (user.personajes.includes(personaje.nombre.toLowerCase())) {
    return conn.reply(m.chat, `✅ Ya tienes el personaje *${personaje.nombre}*.`, m)
  }

  if (user.exp < personaje.precio) {
    return conn.reply(m.chat, `😢 No tienes suficientes monedas para comprar *${personaje.nombre}*.\n💰 Te faltan *${(personaje.precio - user.exp).toLocaleString()}* monedas.`, m)
  }

  user.exp -= personaje.precio
  user.personajes.push(personaje.nombre.toLowerCase())

  return conn.reply(m.chat, `
🎉 *¡Felicidades!*
Has comprado a *${personaje.nombre}* por *${personaje.precio.toLocaleString()}* monedas.

📦 Tu colección actual: ${user.personajes.length} personajes.
`.trim(), m)
}

handler.help = ['comprar <personaje>']
handler.tags = ['rpg', 'economia']
handler.command = ['comprarpersonaje', 'comprar', 'buy']
handler.register = true

export default handler

// Utilidad para precio aleatorio
function precioAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}