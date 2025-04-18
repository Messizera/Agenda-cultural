async function carregarEventosDaPlanilha() {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vThJFYlU0KduwGTipk0Wk_CILMrQsziQXsznN6Fuk07cDV2lFpJ9LA1-0q3_OrV0QcjhreXNaXWROWN/pub?output=csv');
  const data = await response.text();

  const linhas = data.split("\n").slice(1); // pula o cabeçalho
  const eventosDiv = document.getElementById("eventos");
  eventosDiv.innerHTML = "";

  linhas.forEach(linha => {
    const colunas = linha.split(",");

    // Verifica se tem pelo menos 8 colunas (incluindo a imagem)
    if (colunas.length >= 8) {
      const nomeEvento = colunas[1];
      const dataEvento = colunas[2];
      const horario = colunas[3];
      const local = colunas[4];
      const descricao = colunas[5];
      const contato = colunas[6];
      const imagemUrl = colunas[7].trim();

      const el = document.createElement("div");
      el.className = "event";
      el.innerHTML = `
        ${imagemUrl ? `<img src="${imagemUrl}" alt="Imagem do evento" class="imagem-evento">` : ""}
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
