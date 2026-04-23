import express from 'express';
import cors from 'cors'
import Users from './model.js';
const app = express()
app.use(cors())
app.use(express.json())
const router = express.Router();


router.post('/usuarios', async (req, res) => {
    try {
        const novoUsuario = await Users.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar usuário" });
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
app.use(router)

app.listen(8083,function(){
    console.log("Server rodando")
})
export default router;
