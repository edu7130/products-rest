import { DataTypes } from 'sequelize'
import db from '../db/connection'

const Product = db.define('Product', {
    id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.BIGINT,
    },
    price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: 0

    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    img: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'product',
    freezeTableName: true,
    paranoid: true
})

export default Product