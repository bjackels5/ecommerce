const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { doFindAll, doFindOne, doCreate } = require('./api-utils.js');

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
    doFindAll(Tag, includeProducts, res);
});

// /api/tags/1
router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    doFindOne(Tag, includeProducts, req.params.id, res);
});

// /api/tags
router.post('/', (req, res) => {
    // create a new tag
    doCreate(Tag, { tag_name: req.body.tag_name }, res);

    // Tag.create()
    //     .then(dbData => res.json(dbData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });

});

// /api/tags/1
router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(
        {
            tag_name: req.body.tag_name
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbData => {
            if (!dbData[0]) {
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

// /api/tags/1
router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {
            id: req.params.id
        }
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
    })
});

module.exports = router;
