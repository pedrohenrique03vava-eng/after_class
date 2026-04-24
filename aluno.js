const enviar = document.getElementById("butEnviar");

enviar.addEventListener('click', async function(event) { 
    event.preventDefault(); 

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    const dadosAgendamento = {
        nome_lab: document.querySelector("#selectLab").value,
        dataAtividade: document.querySelector("#dataAtividade").value,
        horario: document.querySelector("#horarioAtividade").value,
        usuarioId: usuarioLogado ? usuarioLogado.id : null 
    };

    
    if (!dadosAgendamento.nome_lab || !dadosAgendamento.dataAtividade || !dadosAgendamento.horario) {
        alert("Por favor, preencha todos os campos do questionário.");
        return;
    }

    try {
        const resposta = await fetch('http://localhost:8083/agendamento', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAgendamento)
        });

        if (resposta.ok) {
            alert("Dados enviados com sucesso!");
        } else {
            alert("Erro no servidor ao processar agendamento.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao enviar dados");
    }
});

     