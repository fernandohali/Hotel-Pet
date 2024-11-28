function loadPage(page) {
  // Desestruturação correta com o nome da página a partir do mapeamento pagePaths
  const { html: pagePath, css: cssPath } = pagePaths[page] || pagePaths.Home;

  // Usando o caminho do HTML para carregar a página
  fetch(pagePath)
    .then((response) => {
      if (!response.ok) throw new Error("Página não encontrada");
      return response.text();
    })
    .then((html) => {
      contentDiv.innerHTML = html; // Carrega o conteúdo HTML
      loadCSS(cssPath); // Carrega o CSS relacionado
    })
    .catch((error) => {
      contentDiv.innerHTML = "<p>Erro ao carregar a página.</p>"; // Caso ocorra um erro
      console.error("Erro ao carregar a página:", error);
    });
}
