const router = require('express').Router();
const { Category, Product } = require('../../models');
const { doFindAll, doFindOne, doCreate, doUpdate } = require('./api-utils.js');

// The `/api/categories` endpoint

const includeProducts = [
    {
        model: Product,
        attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
        ]
    }
];

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    doFindAll(Category, includeProducts, res);
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    doFindOne(Category, includeProducts, req.params.id, res);
});

router.post('/', (req, res) => {
    // create a new category
    doCreate(Category, { category_name: req.body.category_name }, res);
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    doUpdate(Category, { category_name: req.body.category_name }, req.params.id, res);
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;
