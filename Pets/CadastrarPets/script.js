document.getElementById("petForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio do formulário

  // Coletando os valores dos campos
  const proprietario = document.getElementById("proprietario").value.trim();
  const imagem = document.getElementById("imagem").files[0];
  const nome = document.getElementById("nome").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const raca = document.getElementById("raca").value.trim();
  const tamanho = document.getElementById("tamanho").value.trim();

  // Validação dos campos obrigatórios
  if (!proprietario || !nome || !tipo || !raca || !tamanho) {
    alert("Por favor, preencha todos os campos obrigatórios marcados com *.");
    return;
  }

  // Aqui, você pode fazer o que for necessário para salvar os dados, como enviar para um servidor ou armazenar no localStorage
  // Exemplo: armazenando no localStorage (apenas para fins de demonstração)
  const petData = {
    proprietario: proprietario,
    imagem: imagem ? imagem.name : null,
    nome: nome,
    tipo: tipo,
    raca: raca,
    tamanho: tamanho,
  };

  // Salvar no localStorage
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets.push(petData);
  localStorage.setItem("pets", JSON.stringify(pets));

  alert("Pet cadastrado com sucesso!");

  // Redireciona para a página de pets
  window.location.href = "../../Pets/Pets.html";
});
