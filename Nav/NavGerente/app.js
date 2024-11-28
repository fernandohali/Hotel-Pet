document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  // Mapeamento de páginas para caminhos de arquivos HTML e CSS
  const pagePaths = {
    Home: { html: "../../Home/Home.html", css: "../../Home/styles.css" },
    FazerReserva: {
      html: "../../Reserva/FazerReserva/FazerReserva.html",
      css: "../../Reserva/FazerReserva/styles.css",
    },
    Reserva: {
      html: "../../Reserva/reservas.html",
      css: "../../Reserva/styles.css",
    },
    Pets: {
      html: "../../Pets/Pets/Pets.html",
      css: "../../Pets/Pets/styles.css",
    },
    CadastrarPet: {
      html: "../../Pets/CadastrarPets/CadastrarPet.html",
      css: "../../Pets/CadastrarPets/styles.css",
    },
    EditarPet: {
      html: "../../Pets/EditarPet/EditarPet.html",
      css: "../../Pets/EditarPet/styles.css",
    },
    VisualizarPet: {
      html: "../../Pets/VisualizarPet/VisualizarPet.html",
      css: "../../Pets/VisualizarPet/styles.css",
    },
    EditarPerfil: {
      html: "../../Home/Usuários/EditarPerfil/EditarPerfil.html",
      css: "../../Home/Usuários/EditarPerfil/styles.css",
    },
    Usuarios: {
      html: "../../Home/Usuários/Usuários.html",
      css: "../../Home/Usuários/styles.css",
    },
    CadastrarUsuarios: {
      html: "../../Home/Usuários/CadastrarUsuario/CadastrarUsuario.html",
      css: "../../Home/Usuários/CadastrarUsuario/styles.css",
    },
    EditarReserva: {
      html: "../../Reserva/editarReserva/editarReserva.html",
      css: "../../Reserva/editarReserva/styles.css",
    },
    EditarReservaEmAndamento: {
      html: "../../Reserva/editarReservaEmAndamento/editarReservaEmAndamento.html",
      css: "../../Reserva/editarReservaEmAndamento/styles.css",
    },
    EditarReservaFinalizada: {
      html: "../../Reserva/editarReservaFinalizada/editarReservaFinalizada.html",
      css: "../../Reserva/editarReservaFinalizada/styles.css",
    },
    Configurar: {
      html: "../../Home/Configurar/configuracoes.html",
      css: "../../Home/Configurar/styles.css",
    },
  };

  // Função para carregar CSS dinamicamente
  function loadCSS(cssPath) {
    let existingLink = document.querySelector("link[data-dynamic-css]");
    if (existingLink) existingLink.remove();

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `${cssPath}?timestamp=${new Date().getTime()}`;
    linkElement.setAttribute("data-dynamic-css", "");
    document.head.appendChild(linkElement);
  }

  // Função para carregar uma página específica
  function loadPage(page) {
    const { html: pagePath, css: cssPath } = pagePaths[page] || pagePaths.Home;

    fetch(pagePath)
      .then((response) => {
        if (!response.ok) throw new Error("Página não encontrada");
        return response.text();
      })
      .then((html) => {
        contentDiv.innerHTML = html;
        loadCSS(cssPath);
      })
      .catch((error) => {
        contentDiv.innerHTML = "<p>Erro ao carregar a página.</p>";
        console.error("Erro ao carregar a página:", error);
      });
  }

  // Função para manipular a navegação
  function handleNavigation(event, page) {
    event.preventDefault();
    history.pushState({ page }, "", `#${page}`);
    loadPage(page);
  }

  // Configura evento de clique para os links de navegação
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const page = link.getAttribute("data-page");
      handleNavigation(event, page);
    });
  });

  // Detecta a navegação pelo histórico
  window.addEventListener("popstate", (event) => {
    const page = event.state ? event.state.page : "Home";
    loadPage(page);
  });

  // Carrega a página inicial
  const initialPage = location.hash.replace("#", "") || "Home";
  loadPage(initialPage);
});
