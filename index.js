import express from 'express';

import fs from 'fs';

const app = express();
const PORT = 3000;

// Lendo arquivo de estados

fs.readFile('./arquivos/Estados.json', 'utf8', (err, data) => {
  let json = JSON.parse(data);
  console.log(json);
});

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(PORT, () => {
  console.log(`API funcionando na porta ${PORT}`);
});
