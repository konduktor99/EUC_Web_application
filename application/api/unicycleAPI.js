const UnicycleRepository = require('../repository/mysql2/UnicycleRepository');

exports.getUnicycles = (req, res, next) => {
    UnicycleRepository.getUnicycles()
        .then(unicycles => {
            res.status(200).json(unicycles);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUnicycleById = (req, res, next) => {
    const idUnicycle = req.params.idUnicycle;
    UnicycleRepository.getUnicycleById(idUnicycle)
        .then(unicycle => {
            if(!unicycle) {
                res.status(404).json({
                    message: 'Unicycle with id: '+idUnicycle+' not found'
                })
            } else {
                res.status(200).json(unicycle);
            }
        });
};

exports.createUnicycle = (req, res, next) => {
    UnicycleRepository.createUnicycle(req.body)
        .then(newObj => {
            res.status(201).json(newObj)
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateUnicycle = (req, res, next) => {
    const idUnicycle = req.params.idUnicycle;
    UnicycleRepository.updateUnicycle(idUnicycle, req.body)
        .then(result => {
            res.status(200).json({message: 'Unicycle updated!', uni: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteUnicycle = (req, res, next) => {
    const idUnicycle = req.params.idUnicycle;
    UnicycleRepository.deleteUnicycle(idUnicycle)
        .then(result => {
            res.status(200).json({message: 'Unicycle removed!', uni: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
