import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("bd", "root", "9632587410Ph@", {
    dialect: "mysql",
    host: "localhost"
});



const Users = sequelize.define('users', {
    nome: { type: DataTypes.STRING, allowNull: false, defaultValue: "Usuário Novo" },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    senha: { type: DataTypes.STRING },
    tipo: { type: DataTypes.STRING, defaultValue: "aluno" } 
});

const Agendamento = sequelize.define('agendamento', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome_lab: { type: DataTypes.STRING, allowNull: false },
    dataAtividade: { type: DataTypes.DATEONLY, allowNull: false },
    horario: { type: DataTypes.TIME, allowNull: false },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});


Agendamento.belongsTo(Users, { foreignKey: 'usuarioId' });
Users.hasMany(Agendamento, { foreignKey: 'usuarioId' });

sequelize.authenticate()
    .then(async () => { 
        console.log("Conexão estabelecida.");
      
        
        await sequelize.sync({ alter: true }); 
        console.log("Tabelas sincronizadas.");

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



export  { Users, Agendamento,Sequelize }; 
