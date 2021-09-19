// The findAll, findOne, create, update, and delete routes all followed a similar pattern, with the
// exception of some of the product routes. They definitely needed some DRYing out!

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

// this will only work for simple create calls that can have all the initial parameters in the initArgs
const doCreate = (model, initArgs, res) => {
    model.create(initArgs)
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

// this will only work for simple update calls that can have all the updated parameters in the updateArgs
const doUpdate = (model, updateArgs, idToUpdate, res) => {
    model.update(
        updateArgs,
        {
            where: {
                id: idToUpdate
            }
        })
        .then(dbData => {
            if (!dbData[0]) {
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

const doDelete = (model, idToDelete, res) => {
    model.destroy({
        where: {
            id: idToDelete
        }
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: `No ${model.name } found with this id` });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}

module.exports = { doFindAll, doFindOne, doCreate, doUpdate, doDelete };
