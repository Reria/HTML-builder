const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (statErr, stats) => {
      if (statErr) {
        console.error(`Error getting file stats for ${file}:`, statErr);
        return;
      }

      if (stats.isFile()) {
        const fileSizeInKb = stats.size / 1024;
        console.log(`${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${fileSizeInKb.toFixed(3)}kb`);
      } else {
        console.error(`${file} is a directory. Only files are allowed.`);
      }
    });
  });
});