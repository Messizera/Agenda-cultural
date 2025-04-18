async function carregarEventosDaPlanilha() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vThJFYlU0KduwGTipk0Wk_CILMrQsziQXsznN6Fuk07cDV2lFpJ9LA1-0q3_OrV0QcjhreXNaXWROWN/pub?output=csv');
    const data = await response.text();
  
    const linhas = data.split("\n").slice(1); // pula o cabeçalho
    const eventosDiv = document.getElementById("eventos");
    eventosDiv.innerHTML = "";
  
    linhas.forEach(linha => {
      const colunas = linha.split(",");
      if (colunas.length >= 4) {
        const [titulo, data, local, descricao] = colunas;
  
        const el = document.createElement("div");
        el.className = "event";
        el.innerHTML = `<h3>${titulo}</h3>
          <p><strong>Data:</strong> ${data}</p>
          <p><strong>Local:</strong> ${local}</p>
          <p>${descricao}</p>`;
  
        eventosDiv.appendChild(el);
      }
    });
  }
  
  carregarEventosDaPlanilha();
  