document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  // Mapeamento de páginas para caminhos de arquivos HTML e CSS
  const pagePaths = {
    Home: { html: "../../Home/Home.html", css: "../../Home/styles.css" },
    Pets: { html: "../../Pets/pets.html", css: "../../Pets/styles.css" },
    Reservas: {
      html: "../../Reservas/reservas.html",
      css: "../../Reservas/styles.css",
    },
    NovaReserva: {
      html: "../../Reservas/novaReserva.html",
      css: "../../Reservas/styles.css",
    },
    VerReserva: {
      html: "../../Reservas/verReserva.html",
      css: "../../Reservas/styles.css",
    },
    EditarPet: {
      html: "../../Pets/editarPet.html",
      css: "../../Pets/styles.css",
    },
    NovoPet: { html: "../../Pets/novoPet.html", css: "../../Pets/styles.css" },
    EditarPerfil: {
      html: "../../Perfil/editarPerfil.html",
      css: "../../Perfil/styles.css",
    },
    Usuarios: {
      html: "../../Usuarios/usuarios.html",
      css: "../../Usuarios/styles.css",
    },
    Configuracoes: {
      html: "../../Configuracoes/configuracoes.html",
      css: "../../Configuracoes/styles.css",
    },
  };

  // Função para carregar CSS dinamicamente com timestamp para evitar cache
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
        if (page === "Configuracoes") initializeConfiguracoesPage();
        if (page === "Usuarios") initializeUsuariosPage();
        if (page === "VerReserva") initializeReservaView(true);
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

  // Função para inicializar configurações (exclusivo para gerente)
  function initializeConfiguracoesPage() {
    const diariaInput = document.querySelector("#valorDiaria");
    const vagasInput = document.querySelector("#numeroVagas");
    const configForm = document.querySelector("#configForm");

    configForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const diaria = diariaInput.value;
      const vagas = vagasInput.value;
      if (diaria && vagas) {
        alert(
          `Configurações atualizadas! Diária: R$${diaria}, Vagas: ${vagas}`
        );
        // Código para salvar configurações no banco
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  }

  // Função para inicializar a tela de usuários com edição de papéis
  function initializeUsuariosPage() {
    const userRoleSelects = document.querySelectorAll(".user-role-select");
    userRoleSelects.forEach((select) => {
      select.addEventListener("change", (event) => {
        const userId = event.target.getAttribute("data-user-id");
        const newRole = event.target.value;
        alert(`Função do usuário ${userId} alterada para ${newRole}`);
        // Código para atualizar função do usuário no banco
      });
    });
  }

  // Função para visualizar e editar reserva, incluindo status finalizado para gerentes
  function initializeReservaView(isGerente) {
    const reservaStatus = document.querySelector("#reservaStatus");
    const notaInput = document.querySelector("#notaEstadia");
    const anotacoesInput = document.querySelector("#anotacoesEstadia");

    if (isGerente && reservaStatus.value === "Finalizada") {
      notaInput.disabled = false;
      anotacoesInput.disabled = false;
    } else if (reservaStatus.value === "Finalizada") {
      notaInput.disabled = true;
      anotacoesInput.disabled = true;
    }

    reservaStatus.addEventListener("change", () => {
      if (reservaStatus.value === "Finalizada") {
        notaInput.disabled = false;
        anotacoesInput.disabled = false;
      } else {
        notaInput.disabled = true;
        anotacoesInput.disabled = true;
      }
    });
  }

  // Carrega a página inicial
  const initialPage = location.hash.replace("#", "") || "Home";
  loadPage(initialPage);
});