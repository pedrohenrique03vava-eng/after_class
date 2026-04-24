import { Router } from "express";
import { Agendamento } from "./model.js"; 

const router = Router(); // Criando a instância do roteador

const rotaAluno = router.post('/agendamento', async function(req, res) {
    try {
        
        const dados = await Agendamento.create(req.body);
        
        console.log("Agendamento salvo com sucesso!");
        res.status(201).json(dados);
    } catch (error) {
        console.error(" Erro no Sequelize:", error);
        res.status(500).json({ erro: "Erro ao enviar dados para o banco" });
    }
});



export default rotaAluno;
