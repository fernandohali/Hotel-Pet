// Dados de exemplo dos pets
const pets = [
    {
      id: "1",
      nome: "Max",
      tipo: "Cachorro",
      raca: "Pastor Alemão",
      tamanho: "Grande",
    },
    {
      id: "2",
      nome: "Ginger",
      tipo: "Gato",
      raca: "Não definida",
      tamanho: "Pequeno",
    },
  ];
  
  // Função para filtrar os dados com base nos campos de pesquisa
  function pesquisarPets(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Captura os valores dos campos de pesquisa
    const id = document.getElementById("id").value.toLowerCase();
    const nome = document.getElementById("nome").value.toLowerCase();
    const raca = document.getElementById("raca").value.toLowerCase();
    const tamanho = document.getElementById("tamanho").value.toLowerCase();
  
    // Filtra os pets com base nos valores dos campos
    const petsFiltrados = pets.filter((pet) => {
      return (
        (id ? pet.id.includes(id) : true) &&
        (nome ? pet.nome.toLowerCase().includes(nome) : true) &&
        (raca ? pet.raca.toLowerCase().includes(raca) : true) &&
        (tamanho ? pet.tamanho.toLowerCase().includes(tamanho) : true)
      );
    });
  
    // Atualiza a tabela com os resultados filtrados
    exibirPets(petsFiltrados);
  }
  
  // Função para exibir os pets na tabela
  function exibirPets(petsParaExibir) {
    const tabelaBody = document.querySelector("table tbody");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados
  
    if (petsParaExibir.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = "<td colspan='6'>Nenhum pet encontrado.</td>";
      tabelaBody.appendChild(tr);
    } else {
      petsParaExibir.forEach((pet) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${pet.id}</td>
          <td>${pet.nome}</td>
          <td>${pet.tipo}</td>
          <td>${pet.raca}</td>
          <td>${pet.tamanho}</td>
          <td>
            <a href="../../Pets/EditarPet/EditarPet.html?id=${pet.id}">Editar</a> | 
            <a href="../../Pets/VisualizarPet/VisualizarPet.html?id=${pet.id}">Visualizar</a>
          </td>
        `;
        tabelaBody.appendChild(tr);
      });
    }
  }
  
  // Evento para processar a pesquisa quando o formulário for submetido
  document
    .querySelector(".search-form")
    .addEventListener("submit", pesquisarPets);
  
  // Evento para limpar a tabela quando o formulário for resetado
  document
    .querySelector(".search-form")
    .addEventListener("reset", () => exibirPets(pets));
  
  // Exibe todos os pets ao carregar a página
  exibirPets(pets);
  