const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

const includeProducts = [
    {
        model: Product,
        as: 'tagged_products',
        attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
        ]
    }
]

// The `/api/tags` endpoint

// /api/tags
router.get('/', (req, res) => {
    Tag.findAll({
        include: includeProducts
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// /api/tags/1
router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: includeProducts
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No tag found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// /api/tags
router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
        tag_name: req.body.tag_name,
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// /api/tags/1
router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
});

// /api/tags/1
router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;
