import { Sequelize } from 'sequelize'

const db = new Sequelize('products', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});


export default db;