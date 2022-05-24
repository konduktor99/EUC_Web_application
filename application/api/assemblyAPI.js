const AssemblyRepository = require('../repository/mysql2/AssemblyRepository');

exports.getAssemblies = (req, res, next) => {
    AssemblyRepository.getAssemblies()
        .then(assemblies => {
            res.status(200).json(assemblies);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAssemblyById = (req, res, next) => {
    const idAssembly = req.params.idAssembly;
    AssemblyRepository.getAssemblyById(idAssembly)
        .then(assembly => {
            if(!assembly) {
                res.status(404).json({
                    message: 'Assembly with id: '+idAssembly+' not found'
                })
            } else {
                res.status(200).json(assembly);
            }
        });
};

exports.createAssembly = (req, res, next) => {
    AssemblyRepository.createAssembly(req.body)
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

exports.updateAssembly = (req, res, next) => {
    const idAssembly = req.params.idAssembly;
    AssemblyRepository.updateAssembly(idAssembly, req.body)
        .then(result => {
            res.status(200).json({message: 'Assembly updated!', assembly: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAssembly = (req, res, next) => {
    const idAssembly = req.params.idAssembly;
    AssemblyRepository.deleteAssembly(idAssembly)
        .then(result => {
            res.status(200).json({message: 'Assembly removed!', assembly: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.deleteManyAssemblies = (req, res, next) => {
    const assembliesIds = req.params.assembliesIds;
    AssemblyRepository.deleteManyAssemblies(assembliesIds)
        .then(result => {
            res.status(200).json({message: 'Assemblies removed!', assembly: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
