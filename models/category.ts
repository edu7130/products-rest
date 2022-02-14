import { DataTypes } from 'sequelize'
import db from '../db/connection'


const Category = db.define('Category', {
    id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'category',
    freezeTableName: true,
    paranoid: true
});

Category.beforeDestroy((cat: any, options) => {
    cat.name = 'DESTROYED: ' + cat.name
})

export default Category;