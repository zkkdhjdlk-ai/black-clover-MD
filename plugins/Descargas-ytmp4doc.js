import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text }) => {
  try {
    if (!text || !text.trim()) {
      return conn.reply(
        m.chat,
        `✳️ Ingresa el nombre o enlace del video de YouTube.\n\n*Ejemplo:* .ytmp4doc Never Gonna Give You Up`,
        m
      );
    }

    // Buscar el video en YouTube
    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const videoInfo = search.all[0];
    const { title, url } = videoInfo;

    // Llamar a la API personalizada
    const api = `https://myapiadonix.vercel.app/api/ytmp4?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    if (!res.ok) throw new Error(`Error al obtener respuesta de la API (status ${res.status})`);

    const json = await res.json();
    if (!json.data || !json.data.download) throw new Error("La API no devolvió un enlace válido");

    // Descargar el archivo real
    const videoRes = await fetch(json.data.download);
    if (!videoRes.ok) throw new Error(`Error al descargar el video (status ${videoRes.status})`);

    const buffer = Buffer.from(await videoRes.arrayBuffer());
    const sizeMB = buffer.length / (1024 * 1024);
    const fileName = `${title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.mp4`;

    // Verificar tamaño (límite 300 MB)
    if (sizeMB > 300) {
      return conn.reply(
        m.chat,
        `⚠️ El video pesa *${sizeMB.toFixed(2)} MB*, supera el límite de 300 MB.\nDescárgalo aquí:\n${json.data.download}`,
        m
      );
    }

    // Enviar video como documento
    await conn.sendMessage(
      m.chat,
      {
        document: buffer,
        mimetype: 'video/mp4',
        fileName,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌ Ocurrió un error al procesar tu solicitud:\n\n${error.message}`, m);
  }
};

handler.command = handler.help = ['ytmp4doc'];
handler.tags = ['descargas'];

export default handler;