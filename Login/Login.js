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
