window.onload = function() {
    // Exibe um alerta com uma mensagem personalizada
    var login = prompt("Digite seu nome de usuário:");
    var senha = prompt("Digite sua senha:");

    // Verifica se o login e a senha estão corretos (você pode adicionar lógica adicional aqui)
    if (login === "123" && senha === "123") {
        alert("Login bem-sucedido! Bem-vindo, " + login + "!");
        baseCode(); // Aqui você pode redirecionar para a próxima página ou iniciar o programa
    } else {
       
        window.onload(); // Chama novamente a função onload para reiniciar o processo
    }
};