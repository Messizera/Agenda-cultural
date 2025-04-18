// Função para lidar com linhas CSV corretamente (mesmo com aspas e vírgulas dentro dos campos)
function parseCSVLinha(linha) {
  const valores = [];
  let atual = '';
  let dentroDeAspas = false;

  for (let i = 0; i < linha.length; i++) {
    const char = linha[i];

    if (char === '"' && linha[i + 1] === '"') {
      atual += '"';
      i++; // pular a próxima aspa dupla
    } else if (char === '"') {
      dentroDeAspas = !dentroDeAspas;
    } else if (char === ',' && !dentroDeAspas) {
      valores.push(atual);
      atual = '';
    } else {
      atual += char;
    }
  }
  valores.push(atual); // adiciona o último valor

  return valores;
}

async function carregarEventosDaPlanilha() {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vThJFYlU0KduwGTipk0Wk_CILMrQsziQXsznN6Fuk07cDV2lFpJ9LA1-0q3_OrV0QcjhreXNaXWROWN/pub?output=csv');
  const data = await response.text();

  const linhas = data.split("\n").slice(1); // pula o cabeçalho
  const eventosDiv = document.getElementById("eventos");
  eventosDiv.innerHTML = "";

  linhas.forEach(linha => {
    if (linha.trim() === "") return; // pular linha vazia

    const colunas = parseCSVLinha(linha);

    if (colunas.length >= 7) {
      const dataHoraEnvio = colunas[0];
      const nomeEvento = colunas[1];
      const dataEvento = colunas[2];
      const horario = colunas[3];
      const local = colunas[4];
      const descricao = colunas[5];
      const contato = colunas[6];

      const el = document.createElement("div");
      el.className = "event";
      el.innerHTML = `
        <p><strong>${dataHoraEnvio}</strong></p>
        <p><strong>Nome:</strong> ${nomeEvento}</p>
        <p><strong>Data:</strong> ${dataEvento}</p>
        <p><strong>Horário:</strong> ${horario}</p>
        <p><strong>Local:</strong> ${local}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Contato:</strong> ${contato}</p>
      `;

      eventosDiv.appendChild(el);
    }
  });
}

carregarEventosDaPlanilha();
