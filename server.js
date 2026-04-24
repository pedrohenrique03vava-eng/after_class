import express from 'express';
import cors from 'cors';
import { Users, Agendamento } from './model.js'; // AJUSTE: Use as chaves { }
import rotaAluno from './backaluno.js';
import rotaSupervisor from './backSupervisor.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rotaAluno)
app.use(rotaSupervisor)
const router = express.Router();



router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const usuario = await Users.findOne({ where: { email, senha } });

        if (usuario) {
            
            res.json(usuario); 
        } else {
            res.status(401).json({ erro: "E-mail ou senha incorretos" });
        }
    } catch (error) {
        res.status(500).json({ erro: "Erro no servidor ao fazer login" });
    }
});


router.get('/usuarios', async (req, res) => {
    try {
        const todosUsuarios = await Users.findAll();
        res.json(todosUsuarios);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
});

app.use(router);

app.listen(8083, function() {
    console.log(" Server rodando na porta 8083");
});

export default router;
