
const fs = require('fs').promises;
const path = require('path');

// Функция для копирования директории
async function copyDir(source, destination) {
  try {
    //  Создаем папку `files-copy`, если ее еще не существует.
    await fs.mkdir(destination, { recursive: true });

    // Читаем содержимое папки `files`.
    const files = await fs.readdir(source);

    // Копируем файлы из папки `files` в папку `files-copy`.
    for (const file of files) {
      const sourcePath = path.join(source, file);
      const destinationPath = path.join(destination, file);

      // Используем fs.stat, чтобы проверить, является ли текущий элемент файлом или директорией.
      const stats = await fs.stat(sourcePath);

      if (stats.isFile()) {
        // Если это файл, копируем его в папку назначения.
        await fs.copyFile(sourcePath, destinationPath);
      } else if (stats.isDirectory()) {
        // Если это директория, рекурсивно вызываем copyDir.
        await copyDir(sourcePath, destinationPath);
      }
    }

    console.log('Директория успешно скопирована!');
  } catch (error) {
    console.error('Ошибка при копировании директории:', error.message);
  }
}

// Вызываем функцию copyDir с указанием исходной и целевой директорий.
copyDir('files', 'files-copy');