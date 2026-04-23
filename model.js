import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("bd", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

const Users = sequelize.define('users', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Usuário Novo"
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true } 
    },
    senha: {
        type: DataTypes.STRING
    },
    data:{
       type: DataTypes.DATEONLY
    },
    tipo:{
        type:DataTypes.STRING,
            defaultValue: "aluno"
        
    } 
}, {
    
    timestamps: true 
});


sequelize.authenticate()
    .then(async () => { 
        console.log("Conexão estabelecida com sucesso.");
      
        await Users.sync(); 
        console.log("Tabela de usuários pronta.");

       
        await criarUsuariosTeste();
    })
    .catch(err => console.error("Erro:", err));

async function criarUsuariosTeste() {
    try {
      

        await Users.create({
            nome: "Admin Teste",
            email: "admin@teste.com",
            senha: "123",
            tipo: "admin"
        });

        await Users.create({
            nome: "Aluno Teste",
            email: "aluno@teste.com",
            senha: "123",
            tipo: "aluno"
        });
        console.log("Usuários de teste criados!");
    } catch (error) {
        console.log("Usuários já existem ou erro na criação.");
    }
}


export default Users;
