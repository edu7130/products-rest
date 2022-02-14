import Category from "./category";
import Product from "./product";


Category.hasMany(Product)
Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    }
})
