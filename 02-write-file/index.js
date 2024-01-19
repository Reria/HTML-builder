const fs = require('fs');
const readline = require('readline');

// Создаем поток для записи в файл
const fileStream = fs.createWriteStream('./02-write-file/output.txt', { flags: 'a' });

// Создаем интерфейс для чтения с консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Выводим приветственное сообщение
console.log('Привет! Введи текст. Для выхода используйте "exit" или нажмите ctrl + c.');

// Ждем ввода пользователя
rl.on('line', (input) => {
  // Проверяем, не введено ли "exit"
  if (input.toLowerCase() === 'exit') {
    console.log('До свидания!'); // Выводим прощальное сообщение
    rl.close(); // Закрываем интерфейс
    fileStream.end(); // Закрываем поток файла
  } else {
    // Пишем введенный текст в файл и ждем следующего ввода
    fileStream.write(input + '\n');
    console.log('Текст успешно записан в файл. Введите следующий текст:');
  }
});

// Обработка события завершения процесса
process.on('SIGINT', () => {
  console.log('Пока!'); // Выводим прощальное сообщение
  rl.close(); // Закрываем интерфейс
  fileStream.end(); // Закрываем поток файла
});