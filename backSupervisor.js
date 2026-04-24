import { Router } from "express";
import { Agendamento, Users } from "./model.js"; 

const router = Router();


router.get('/agendamentos-lab', async (req, res) => {
    try {
        const labEscolhido = req.query.lab; 

        const agendamentos = await Agendamento.findAll({
            where: { nome_lab: labEscolhido },
            include: [{ 
                model: Users, 
                
            }]
        });

        res.json(agendamentos); 
    } catch (error) {
        console.error("Erro detalhado no Sequelize:", error);
        res.status(500).json({ erro: "Erro ao buscar dados", detalhes: error.message });
    }
});

export default router;
