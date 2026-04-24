alert = ("dadwadawdwa")

async function verAlunos(nomeLab) {
    try {
        const response = await fetch(`http://localhost:8083/agendamentos-lab?lab=${nomeLab}`);
        const alunos = await response.json();

        // 1. OLHE ISSO NO CONSOLE: Veja se aparece [] ou se aparecem os dados
        console.log("Dados que vieram do banco:", alunos);

        document.getElementById("tituloLab").innerText = `Alunos em: ${nomeLab.replace('_', ' ')}`;
        const corpoTabela = document.getElementById("listaAlunos");
        corpoTabela.innerHTML = "";

        if (!alunos || alunos.length === 0) {
            corpoTabela.innerHTML = "<tr><td colspan='4' style='text-align:center'>Nenhum registro no banco para este lab.</td></tr>";
            return;
        }

        alunos.forEach(agendamento => {
            // 2. VERIFICAÇÃO DE SEGURANÇA: Se o include falhou, ele pega o ID do usuário como reserva
            const nomeExibicao = agendamento.user ? agendamento.user.nome : `ID Usuário: ${agendamento.usuarioId}`;
            
            corpoTabela.innerHTML += `
                <tr>
                    <td>${nomeExibicao}</td>
                    <td>${agendamento.horario || 'Sem hora'}</td>
                    <td>${agendamento.dataAtividade || 'Sem data'}</td>
                    <td><button class="btn-check">Confirmar</button></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}
