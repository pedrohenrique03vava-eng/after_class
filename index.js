const enviar = document.getElementById("butEnviar")


enviar.addEventListener('click', async function(event){ 
    event.preventDefault();
    
    let email = document.getElementById("loginEmail").value
    let senha = document.getElementById("loginSenha").value

    if(!email || !senha){
        alert("Os dados não podem estar vazios")
        return;
    }

    const dadosEnviar = {
        email: email,
        senha: senha
    }

    try {
        const reponse = await fetch('http://localhost:8083/usuarios', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosEnviar)
        })

        if(reponse.ok){
            alert("Dados enviados com sucesso")
            
            setTimeout(() => {
                 verificarCargo(email); 
            },500);
            
        } else {
            alert("Erro ao enviar dados")
        }

        document.getElementById("loginEmail").value = ""
        document.getElementById("loginSenha").value = ""
    
    } catch(err) {
        console.log("erro ao enviar dados a API")
    }
})

async function verificarCargo(emailLogado) {
    try {
        const response = await fetch("http://localhost:8083/usuarios");
        const usuarios = await response.json();

        console.log("Tentando encontrar o email:", `|${emailLogado}|`);
        console.log("Emails disponíveis no banco:", usuarios.map(u => `|${u.email}|`));

        
        const usuarioAtual = usuarios.find(u => u.email === emailLogado);

        if (!usuarioAtual) {
            console.log("Usuário não encontrado na lista da API");
            return;
        }

        if (usuarioAtual.tipo === "admin") {
            window.location.href = "https://www.youtube.com";
        } else if (usuarioAtual.tipo === "aluno") {
            window.location.href = "https://www.facebook.com";
        }
        
    } catch (error) {
        console.error("Erro ao verificar cargo:", error);
    }
}
