// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

console.log("models/index.js");

// According to the Requirements, "The functionality for creating the many-to-many relationship for products is already done for you."
// Where did they do that?

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id'
});


// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'tagged_products',
    foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    as: 'tagged_products',
    foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
