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

async function getEstadosComMaisCidades(order) {
  let estados = await fs.readFile('./arquivos/Estados.json', 'utf8');
  let estadosJson = JSON.parse(estados);
  let lista = [];

  for (const estado of estadosJson) {
    const num_cidades = await getQuantidadeCidades(estado.Sigla);

    lista.push({ uf: estado.Sigla, num_cidades });
  }

  lista.sort((a, b) => {
    if (order === 'desc') return b.num_cidades - a.num_cidades;
    else return a.num_cidades - b.num_cidades;
  });

  return lista;
}

//createFiles();
//getQuantidadeCidades('CE');
//getEstadosComMaisCidades('desc');
