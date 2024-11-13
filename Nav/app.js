document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  // Mapeamento de páginas para caminhos de arquivos HTML e CSS
  const pagePaths = {
    Home: { html: "../Home/Home.html", css: "styles.css" },
    Pets: { html: "../Pets/pets.html", css: "../Pets/styles.css" },
    Reservas: { html: "../Home/Reservas/reservas.html", css: "../Home/Reservas/styles.css" },
    NovaReserva: { html: "Reservas/nova-reserva.html", css: "styles.css" },
    VerReserva: { html: "Reservas/ver-reserva.html", css: "styles.css" },
    EditarPet: { html: "Pets/editar-pet.html", css: "style-pet.css" },
    NovoPet: { html: "Pets/novo-pet.html", css: "style-pet.css" },
    EditarPerfil: { html: "Perfil/editar-perfil.html", css: "styles.css" },
  };

  // Função para carregar CSS dinamicamente com timestamp para evitar cache
  function loadCSS(cssPath) {
    let existingLink = document.querySelector("link[data-dynamic-css]");
    if (existingLink) existingLink.remove();

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `${cssPath}?timestamp=${new Date().getTime()}`; // Evita cache
    linkElement.setAttribute("data-dynamic-css", ""); // Marcador para identificar
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
        loadCSS(cssPath); // Carrega o CSS específico da página
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
