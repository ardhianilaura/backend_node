import { Sequelize } from "sequelize";

const db = new Sequelize('project_planner', 'root', 'root', {
    host: '127.0.0.1',
    port: '8889',
    dialect: "mysql"
});

export default db;