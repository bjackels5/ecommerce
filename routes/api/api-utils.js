const doFindAll = (model, toInclude, res) => {
    model.findAll({
        include: toInclude
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}

module.exports = { doFindAll };



