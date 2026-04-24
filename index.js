const enviar = document.getElementById("butEnviar");

enviar.addEventListener('click', async function(event) { 
    event.preventDefault();
    
    let email = document.getElementById("loginEmail").value;
    let senha = document.getElementById("loginSenha").value;

    if(!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const dadosEnviar = { email, senha };

    try {
        
        const response = await fetch('http://localhost:8083/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosEnviar)
        });

        if(response.ok) {
            const usuario = await response.json(); 
            
            
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

            alert(`Bem-vindo, ${usuario.nome}!`);
            
            
            if (usuario.tipo === "admin" || usuario.tipo === "supervisor") {
                window.location.href = "supervisor.html";
            } else {
                window.location.href = "aluno.html";
            }
            
        } else {
            alert("E-mail ou senha incorretos!");
        }

        document.getElementById("loginEmail").value = "";
        document.getElementById("loginSenha").value = "";
    
    } catch(err) {
        console.error("Erro ao conectar com a API:", err);
    }
});
