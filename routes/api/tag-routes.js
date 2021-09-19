const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { doFindAll, doFindOne, doCreate, doUpdate, doDelete } = require('./api-utils.js');

// The /api/tag routes

// This array slightly differs from that in category-routes, so DRYing could not be applied across files.
// It is used by both findAll and findOne, though, so still worth pulling out as a global.
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
];

// The `/api/tags` endpoints

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
});

// /api/tags/1
router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    doUpdate(Tag, { tag_name: req.body.tag_name }, req.params.id, res);
});

// /api/tags/1
router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    doDelete(Tag, req.params.id, res);
});

module.exports = router;
