function validarLogin(event) {
  event.preventDefault();

  // Pegando os dados do formulário
  var login = document.getElementById("login").value;
  var senha = document.getElementById("senha").value;

  // Dados fictícios de login para cliente, funcionário e gerente
  const usuarios = {
    cliente: { login: "cliente", senha: "123", role: "cliente" },
    funcionario: { login: "funcionario", senha: "123", role: "funcionario" },
    gerente: { login: "gerente", senha: "123", role: "gerente" },
  };

  // Verificar se os dados de login existem
  let usuarioAutenticado = Object.values(usuarios).find(
    (user) => user.login === login && user.senha === senha
  );

  if (!usuarioAutenticado) {
    alert("Usuário ou senha incorretos.");
  } else {
    // Armazenando o usuário logado no localStorage para uso em outras páginas
    localStorage.setItem("usuario", JSON.stringify(usuarioAutenticado));

    alert("Login realizado com sucesso!");

    // Redireciona para a página principal dependendo do tipo de usuário
    if (usuarioAutenticado.role === "cliente") {
      window.location.href = "../Nav/NavCliente/index.html"; // Página do Cliente
    } else if (usuarioAutenticado.role === "funcionario") {
      window.location.href = "../Nav/NavFuncionario/index.html"; // Página do Funcionário
    } else if (usuarioAutenticado.role === "gerente") {
      window.location.href = "../Nav/NavGerente/index.html"; // Página do Gerente
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const carouselContainer = document.querySelector(".carousel-container");
  let index = 0;

  function autoSlide() {
    index = (index + 1) % slides.length; // Cálculo para voltar ao início após o último slide
    const slideWidth = slides[0].clientWidth; // Largura de um slide
    carouselContainer.style.transition = "transform 1s ease-in-out"; // Suavidade na transição
    carouselContainer.style.transform = `translateX(-${index * slideWidth}px)`; // Move para o próximo slide
  }

  function resetTransition() {
    if (index === 0) {
      // Remove transição para reiniciar o carrossel
      carouselContainer.style.transition = "none";
      carouselContainer.style.transform = `translateX(0px)`;
    }
  }

  // Alternar slides automaticamente
  setInterval(() => {
    autoSlide();
    setTimeout(resetTransition, 1000); // Reseta se necessário após cada loop
  }, 5000); // 5 segundos para cada slide
});
