let handler = async (m, { conn, usedPrefix, command }) => {
  const preguntas = [
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra una banshee?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 3,
    "recompensa": 16054
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un licántropo?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 19967
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un caballero maldito?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 13963
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un demonio menor?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 0,
    "recompensa": 19234
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un elfo oscuro?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 1,
    "recompensa": 18872
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un licántropo?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 1,
    "recompensa": 13582
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un licántropo?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 3,
    "recompensa": 10456
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un fénix?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 0,
    "recompensa": 17694
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un dragón de fuego?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 13890
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 1,
    "recompensa": 13073
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de una banshee?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 2,
    "recompensa": 12063
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de una sombra espectral?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 13642
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un elfo oscuro?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 1,
    "recompensa": 15651
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un caballero maldito?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 16016
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un caballero maldito?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 3,
    "recompensa": 18971
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una banshee?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 17949
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un golem mágico?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 3,
    "recompensa": 15772
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un demonio menor?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 10777
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un elfo oscuro?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 1,
    "recompensa": 19570
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de una banshee?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 2,
    "recompensa": 19023
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un dragón de fuego?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 1,
    "recompensa": 10556
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a una banshee?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 2,
    "recompensa": 12101
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 0,
    "recompensa": 13998
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un caballero maldito?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 1,
    "recompensa": 16079
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 19275
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un ogro de piedra?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 12115
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un caballero maldito?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 0,
    "recompensa": 13890
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una sombra espectral?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 1,
    "recompensa": 17429
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un dragón de fuego?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 3,
    "recompensa": 11912
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un ogro de piedra?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 2,
    "recompensa": 18849
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un ogro de piedra?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 18560
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un golem mágico?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 2,
    "recompensa": 19088
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un ogro de piedra?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 12873
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un caballero maldito?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 1,
    "recompensa": 17098
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un caballero maldito?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 18578
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una banshee?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 13733
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un elfo oscuro?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 1,
    "recompensa": 19401
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una sombra espectral?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 3,
    "recompensa": 19338
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra una banshee?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 1,
    "recompensa": 19448
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un fénix?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 17997
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un fénix?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 18309
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un demonio menor?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 13327
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un fénix?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 2,
    "recompensa": 15662
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un elfo oscuro?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 1,
    "recompensa": 11657
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un golem mágico?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 3,
    "recompensa": 10147
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 12534
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra una sombra espectral?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 12399
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una sombra espectral?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 1,
    "recompensa": 11320
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un elfo oscuro?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 14777
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un golem mágico?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 13997
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un golem mágico?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 3,
    "recompensa": 12737
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 0,
    "recompensa": 18363
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un elfo oscuro?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 14748
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un dragón de fuego?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 3,
    "recompensa": 13322
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un fénix?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 19982
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un caballero maldito?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 19386
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una banshee?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 1,
    "recompensa": 17147
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un golem mágico?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 14620
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un golem mágico?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 14712
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra una sombra espectral?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 1,
    "recompensa": 15912
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un elfo oscuro?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 11642
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un golem mágico?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 1,
    "recompensa": 18751
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un ogro de piedra?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 1,
    "recompensa": 17994
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un demonio menor?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 13654
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de una banshee?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 14419
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un demonio menor?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 0,
    "recompensa": 14227
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una banshee?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 1,
    "recompensa": 13588
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un demonio menor?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 17245
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un demonio menor?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 1,
    "recompensa": 14590
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un caballero maldito?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 2,
    "recompensa": 11864
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un demonio menor?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 3,
    "recompensa": 18631
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un caballero maldito?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 2,
    "recompensa": 17640
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un demonio menor?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 0,
    "recompensa": 13448
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a una sombra espectral?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 3,
    "recompensa": 13574
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un caballero maldito?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 1,
    "recompensa": 19522
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra una sombra espectral?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 17138
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 1,
    "recompensa": 16987
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a una banshee?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 0,
    "recompensa": 10492
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un fénix?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 0,
    "recompensa": 12409
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un dragón de fuego?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 2,
    "recompensa": 15941
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un caballero maldito?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 3,
    "recompensa": 15897
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un caballero maldito?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 0,
    "recompensa": 19448
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un elfo oscuro?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 1,
    "recompensa": 14288
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un ogro de piedra?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 12641
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a una banshee?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 2,
    "recompensa": 10098
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un demonio menor?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 1,
    "recompensa": 19884
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un dragón de fuego?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 19345
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un dragón de fuego?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 3,
    "recompensa": 16528
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 3,
    "recompensa": 16905
  },
  {
    "pregunta": "📜 ¿Cuál es el símbolo mágico de un dragón de fuego?",
    "opciones": [
      "🌀 Aire",
      "🌊 Agua",
      "🌋 Fuego",
      "🌍 Tierra"
    ],
    "respuesta": 0,
    "recompensa": 12304
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un demonio menor?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 1,
    "recompensa": 17748
  },
  {
    "pregunta": "🔮 ¿Qué hechizo puede detener a un golem mágico?",
    "opciones": [
      "⏳ Crono",
      "🔥 Incendio",
      "🧲 Magneto",
      "💀 Maldición"
    ],
    "respuesta": 1,
    "recompensa": 18711
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a una banshee?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 1,
    "recompensa": 16054
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un licántropo?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 0,
    "recompensa": 11255
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de una banshee?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 1,
    "recompensa": 12793
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un dragón de fuego?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 3,
    "recompensa": 14259
  },
  {
    "pregunta": "🧠 ¿Cuál es la debilidad de un ogro de piedra?",
    "opciones": [
      "⚡ Electricidad",
      "💧 Agua",
      "🔥 Fuego",
      "🪓 Hachas"
    ],
    "respuesta": 2,
    "recompensa": 15792
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un elfo oscuro?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 3,
    "recompensa": 16038
  },
  {
    "pregunta": "🧪 ¿Qué ingrediente es clave para vencer a un fénix?",
    "opciones": [
      "🌿 Hierba de luna",
      "💀 Hueso de demonio",
      "🧊 Cristal de hielo",
      "🧠 Cerebro arcano"
    ],
    "respuesta": 2,
    "recompensa": 14205
  },
  {
    "pregunta": "🗡️ ¿Qué arma es más efectiva contra un golem mágico?",
    "opciones": [
      "🪓 Hacha",
      "🏹 Arco",
      "⚔️ Espada",
      "🪄 Bastón"
    ],
    "respuesta": 0,
    "recompensa": 13805
  }
]

  const q = preguntas[Math.floor(Math.random() * preguntas.length)]

  let texto = `🎮 *Trivia RPG*\n\n${q.pregunta}\n\n`
  q.opciones.forEach((opt, i) => { texto += `${i + 1}. ${opt}\n` })
  texto += `\n⏳ Responde escribiendo el número correcto. Tienes *30 segundos*.`

  await conn.reply(m.chat, texto, m)
  const res = await conn.awaitReply(m.chat, m.sender, 30000).catch(() => null)
  if (!res) return conn.reply(m.chat, '⌛ Tiempo agotado. ¡Se fue la oportunidad!', m)

  const user = global.db.data.users[m.sender] || { monedas: 0 }

  if (parseInt(res.text) - 1 === q.respuesta) {
    user.monedas += q.recompensa
    conn.reply(m.chat, `✅ *¡Correcto!*\nGanaste ${q.recompensa.toLocaleString()} monedas 🪙`, m)
  } else {
    conn.reply(m.chat, `❌ *Incorrecto.*\nLa respuesta correcta era: ${q.opciones[q.respuesta]}`, m)
  }
}

handler.command = ['trivia', 'pregunta', 'quiz']
handler.tags = ['rpg', 'juegos']
handler.help = ['trivia']
handler.register = true

export default handler