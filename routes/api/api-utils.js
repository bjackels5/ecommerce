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

const doFindOne = (model, toInclude, selectedId, res) => {
    model.findOne({
        where: {
            id: selectedId,
        },
        include: toInclude
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: `No ${model.name} found with this id` });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}

const doCreate = (model, initArgs, res) => {
    model.create(initArgs)
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

module.exports = { doFindAll, doFindOne, doCreate };



