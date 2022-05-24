const PartRepository = require('../repository/mysql2/PartRepository');

exports.getParts = (req, res, next) => {
    PartRepository.getParts()
        .then(parts => {
            res.status(200).json(parts);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPartById = (req, res, next) => {
    const idPart = req.params.idPart;
    PartRepository.getPartById(idPart)
        .then(part => {
            if(!part) {
                res.status(404).json({
                    message: 'Part with id: '+idPart+' not found'
                })
            } else {
                res.status(200).json(part);
            }
        });
};

exports.createPart = (req, res, next) => {
    PartRepository.createPart(req.body)
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

exports.updatePart = (req, res, next) => {
    const idPart = req.params.idPart;
    PartRepository.updatePart(idPart, req.body)
        .then(result => {
            res.status(200).json({message: 'Part updated!', part: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePart = (req, res, next) => {
    const idPart = req.params.idPart;
    PartRepository.deletePart(idPart)
        .then(result => {
            res.status(200).json({message: 'Part removed!', part: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
