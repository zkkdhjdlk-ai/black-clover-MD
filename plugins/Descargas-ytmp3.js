import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text || !text.trim()) {
      return conn.reply(
        m.chat,
        `✳️ Ingresa el nombre o enlace del video de YouTube.\n\n*Ejemplo:* .${command} Never Gonna Give You Up`,
        m
      );
    }

   
    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const videoInfo = search.all[0];
    const { title, url } = videoInfo;

    
    const api = `https://myapiadonix.vercel.app/api/ytmp3?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    if (!res.ok) throw new Error(`Error al obtener respuesta de la API (status ${res.status})`);

    const json = await res.json();
    if (!json.data || !json.data.download) throw new Error("La API no devolvió un enlace válido");

  
    const audioRes = await fetch(json.data.download);
    if (!audioRes.ok) throw new Error(`Error al descargar el audio (status ${audioRes.status})`);

    const buffer = Buffer.from(await audioRes.arrayBuffer());
    const sizeMB = buffer.length / (1024 * 1024);
    const fileName = `${title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.mp3`;

    
    if (sizeMB > 64) {
      return conn.reply(m.chat, `⚠️ El audio pesa *${sizeMB.toFixed(2)} MB*, supera el límite (64 MB).\nDescárgalo aquí:\n${json.data.download}`, m);
    }

    
    await conn.sendMessage(
      m.chat,
      {
        document: buffer,
        mimetype: 'audio/mpeg',
        fileName: fileName,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    return conn.reply(
      m.chat,
      `❌ Ocurrió un error al procesar tu solicitud:\n\n${error.message}`,
      m
    );
  }
};

handler.command = handler.help = ['ytmp3'];
handler.tags = ['descargas'];

export default handler;