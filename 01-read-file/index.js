const fs = require('fs');
const path = require('path');

// Получаем абсолютный путь к файлу text.txt
const filePath = path.join(__dirname, 'text.txt');

// Создаем ReadStream из файла
const readStream = fs.createReadStream(filePath);

// Направляем поток чтения в стандартный поток вывода
readStream.pipe(process.stdout);

// Обработка события ошибки, если таковая произойдет
readStream.on('error', (err) => {
  console.error(`Ошибка чтения файла: ${err.message}`);
});