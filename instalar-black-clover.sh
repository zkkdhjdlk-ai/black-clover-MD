#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Instalación automática de black-clover-MD con actualización y pm2"

# Actualizar sistema
pkg update && pkg upgrade -y

# Instalar dependencias
pkg install -y nodejs git python ffmpeg libwebp wget curl imagemagick

# Instalar pm2
npm install -g pm2

# Clonar o actualizar el bot
cd $HOME
if [ -d "black-clover-MD" ]; then
  echo "🔁 Repositorio ya existe, actualizando..."
  cd black-clover-MD
  git pull
else
  echo "📥 Clonando el repositorio..."
  git clone https://github.com/thecarlos19/black-clover-MD
  cd black-clover-MD
fi

# Instalar dependencias
npm install

# Crear archivo de inicio automático
echo "#!/data/data/com.termux/files/usr/bin/bash" > $HOME/start-bot.sh
echo "cd \$HOME/black-clover-MD" >> $HOME/start-bot.sh
echo "git pull" >> $HOME/start-bot.sh
echo "npm install" >> $HOME/start-bot.sh
echo "pm2 start start.js --name black-clover" >> $HOME/start-bot.sh
echo "pm2 save" >> $HOME/start-bot.sh
chmod +x $HOME/start-bot.sh

# Agregar a .bashrc para que se ejecute al abrir Termux
if ! grep -q "start-bot.sh" ~/.bashrc; then
  echo "🔁 Agregando ejecución automática al iniciar Termux..."
  echo "bash \$HOME/start-bot.sh" >> ~/.bashrc
fi

# Iniciar por primera vez
bash $HOME/start-bot.sh

# Mensaje final
echo ""
echo "✅ Bot instalado, actualizado y configurado para autoiniciarse en Termux."
echo "ℹ️ Al abrir Termux, el bot se actualizará automáticamente."
echo "📌 Usa 'pm2 list', 'pm2 logs' o 'pm2 restart all' para gestionarlo."
