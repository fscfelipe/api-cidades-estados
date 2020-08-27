import { promises as fs } from 'fs';

// Lendo arquivo de estados
async function createFiles() {
  let estados = await fs.readFile('./arquivos/Estados.json', 'utf8');
  const estadosJson = JSON.parse(estados);

  let cidades = await fs.readFile('./arquivos/Cidades.json', 'utf8');
  const cidadesJson = JSON.parse(cidades);

  // Criando um arquivo para cada estados e suas cidades
  for (const estado of estadosJson) {
    const cidadesPorEstado = cidadesJson.filter((cidade) => {
      return cidade.Estado === estado.ID;
    });

    await fs.writeFile(
      `./arquivos/cidadesPorEstado/${estado.Sigla}.json`,
      JSON.stringify(cidadesPorEstado)
    );
  }
}

async function getQuantidadeCidades(estado) {
  const dados = await fs.readFile(
    `./arquivos/cidadesPorEstado/${estado}.json`,
    'utf8'
  );

  const estadoJson = JSON.parse(dados);

  return estadoJson.length;
}

//createFiles();
getQuantidadeCidades('CE');
