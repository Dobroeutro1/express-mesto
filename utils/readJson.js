const fs = require('fs').promises;

const error = { message: 'Ошибка чтения файла' };

const readJson = (path) => fs.readFile((path))
  .then((text) => {
    try {
      return JSON.parse(text);
    } catch (_) {
      throw error;
    }
  });
module.exports = readJson;
