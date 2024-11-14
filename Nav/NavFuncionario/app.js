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
        if (page === "NovaReserva") initializeReservaForm();
        if (page === "NovoPet") initializePetForm();
        if (page === "Usuarios") initializeUsuariosPage();
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

  // Funções para manipulação de reservas, pets e usuários
  function initializeReservaForm() {
    const reservaForm = document.querySelector("#reservaForm");
    reservaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const petName = document.querySelector("#petName").value;
      const periodoEstadia = document.querySelector("#periodoEstadia").value;
      const anotacoes = document.querySelector("#anotacoes").value;
      const statusReserva = document.querySelector("#statusReserva").value;

      if (petName && periodoEstadia && statusReserva) {
        const totalDiarias = calcularValorEstadia(periodoEstadia);
        alert(`Reserva para ${petName} confirmada! Total: R$${totalDiarias}`);
        // Código para salvar reserva no banco
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    });
  }

  function calcularValorEstadia(periodo) {
    const diaria = 100; // Exemplo de valor por diária
    return diaria * periodo;
  }

  function initializePetForm() {
    const petForm = document.querySelector("#petForm");
    petForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const petName = document.querySelector("#petName").value;
      const petType = document.querySelector("#petType").value;
      const proprietario = document.querySelector("#proprietario").value;

      if (petName && petType && proprietario) {
        alert(
          `Pet ${petName} cadastrado com sucesso para o proprietário ${proprietario}!`
        );
        // Código para salvar pet no banco
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  }

  function initializeUsuariosPage() {
    const userForm = document.querySelector("#userForm");
    userForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const userName = document.querySelector("#userName").value;
      const userEmail = document.querySelector("#userEmail").value;

      if (userName && userEmail) {
        alert(`Usuário ${userName} cadastrado com sucesso!`);
        // Código para salvar usuário no banco
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  }

  // Carrega a página inicial
  const initialPage = location.hash.replace("#", "") || "Home";
  loadPage(initialPage);
});
