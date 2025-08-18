import fetch from 'node-fetch';

let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🚩 Escribe la URL de un repositorio de GitHub que deseas descargar.`, m, global.rcanal);
  }

  if (!regex.test(args[0])) {
    return conn.reply(m.chat, `Verifica que la *URL* sea de GitHub`, m, global.rcanal).then(_ => m.react(global.error));
  }

  let [_, user, repo] = args[0].match(regex) || [];
  let sanitizedRepo = repo.replace(/.git$/, '');
  let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`;
  let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`;

  await m.react(global.rwait);

  try {
    // Mostrar mensaje de espera
    conn.reply(m.chat, global.wait, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: global.packname,
          body: global.dev,
          previewType: 0,
          thumbnail: global.icons,
          sourceUrl: global.channelRD.id
        }
      }
    });

    let [repoResponse, zipResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(zipUrl)
    ]);

    let repoData = await repoResponse.json();
    let disposition = zipResponse.headers.get('content-disposition');
    let filename = disposition ? disposition.match(/attachment; filename=(.*)/)[1] : `${sanitizedRepo}.zip`;
    let img = 'https://i.ibb.co/tLKyhgM/file.png';

    let txt = `*乂  G I T H U B  -  D O W N L O A D*\n\n`;
    txt += `✩  *Nombre* : ${sanitizedRepo}\n`;
    txt += `✩  *Repositorio* : ${user}/${sanitizedRepo}\n`;
    txt += `✩  *Creador* : ${repoData.owner.login}\n`;
    txt += `✩  *Descripción* : ${repoData.description || 'Sin descripción disponible'}\n`;
    txt += `✩  *Url* : ${args[0]}\n\n`;
    txt += `*${global.textbot}*`;

    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, global.rcanal);
    await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m);
    await m.react(global.done);

  } catch {
    await m.react(global.error);
  }
};

handler.help = ['gitclone *<url git>*'];
handler.tags = ['descargas'];
handler.command = ['gitclone'];
handler.register = true;

export default handler;