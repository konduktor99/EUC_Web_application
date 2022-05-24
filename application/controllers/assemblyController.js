const AssemblyRepository = require ('../repository/mysql2/AssemblyRepository');
const PartRepository = require ('../repository/mysql2/PartRepository');
const UnicycleRepository = require ('../repository/mysql2/UnicycleRepository');


exports.showAssemblyList = (req,res,next)=>{

    AssemblyRepository.getAssemblies()
    .then(assemblies => 
        { console.log(assemblies);

            res.render('pages/assembly/list',{

                assemblies: assemblies,
                navLocation: 'assem'
                
            });


        });

}

exports.showAddAssemblyForm = (req,res,next)=>{

    UnicycleRepository.getUnicycles()
    .then(unis => {
        PartRepository.getParts()
        .then(parts =>{
            
            
               
                res.render('pages/assembly/form',{
                    
                    assembly: {},
                    unis: unis,
                    parts: parts,
                    
                    pageTitle: 'Dodaj usługę montażu',
                    formMode: 'createNew',
                    formAction: '/assemblies/add',
                    navLocation: 'assem',
                    validationErrors: [],
                    defaultInputStyle: '',
                    submittedFirstTime: ''
                });
                //console.log(assembly);
                console.log(unis);
                console.log(parts);
            });    
        });
      

}

exports.showAssemblyDetails = (req,res,next)=>{

    const idAssembly = req.params.idAssembly;
    AssemblyRepository.getAssemblyById(idAssembly)
    .then(assembly =>{
        res.render('pages/assembly/details',{

            assembly: assembly,
            navLocation: 'assem'
        });
        
    });    

}

exports.showEditAssemblyForm = (req,res,next)=>{

    const idAssembly = req.params.idAssembly;

    UnicycleRepository.getUnicycles()
    .then(unis => {
        PartRepository.getParts()
        .then(parts =>{
                  
                AssemblyRepository.getAssemblyById(idAssembly)
                .then(assembly =>{
                    res.render('pages/assembly/form',{

                        assembly: assembly,
                        unis: unis,
                        parts: parts,
                        pageTitle: 'Edytuj usługę montażu',
                        formMode: 'edit',
                        formAction: '/assemblies/edit',
                        navLocation: 'assem',
                        validationErrors: [],
                        defaultInputStyle: ''
                        
                    });
                    // console.log(idAssembly);
                    // console.log(assembly);
                });    
            }); 
        }); 
         
}


exports.addAssembly = (req,res,next)=>{


    const assemData = {
        
        price: req.body.assemblyPrice,
        startDate: req.body.startDate,
        endDate:  req.body.endDate,
        clientName: req.body.clientName,
        idUnicycle: req.body.unicycle,
        idPart: req.body.partName,
        clientNumber: req.body.clientNumber,
        clientRemarks: req.body.clientRemarks,
        unicycle: {
            idUnicycle: req.body.unicycle,
            
        },
        part: {
            idPart: req.body.partName,
        }
     };

     console.log('dfghhgfdfghjgfd');
     console.log(assemData);

      AssemblyRepository.createAssembly(assemData)
      .then( result => {
          res.redirect('/assemblies');
      })
      .catch( err => {
        UnicycleRepository.getUnicycles()
        .then(unis => {

            PartRepository.getParts()
            .then(parts => {
    
                res.render('pages/assembly/form',{
                    assembly: assemData,
                    unis: unis,
                    parts: parts,
                    pageTitle: 'Dodaj usługę montażu',
                    formMode: 'addAfterReject',
                    formAction: '/assemblies/add',
                    navLocation: 'assem',
                    validationErrors: err.details,
                    defaultInputStyle: 'correct-input',
                    submittedFirstTime: 'validate'
                });
            });    
        });
        console.log(err);
      });

      console.log(assemData);
}

exports.updateAssembly = (req,res,next)=>{

    const idAssembly = req.body.idAssembly;
  
    const assemData = {
        
        idAssembly: req.body.idAssembly,
        price: req.body.assemblyPrice,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        clientName: req.body.clientName,
        idUnicycle: req.body.unicycle,
        idPart: req.body.partName,
        clientNumber: req.body.clientNumber,
        clientRemarks: req.body.clientRemarks,
        unicycle: {
            idUnicycle: req.body.unicycle,
            
        },
        part: {
            idPart: req.body.partName,
        }
     };
    
       
    AssemblyRepository.updateAssembly(idAssembly, assemData)
    .then( result => {
        res.redirect('/assemblies');
    })
    .catch( err => {
        UnicycleRepository.getUnicycles()
        .then(unis => {

            PartRepository.getParts()
            .then(parts => {
    
                res.render('pages/assembly/form',{
                    assembly: assemData,
                    unis: unis,
                    parts: parts,
                    pageTitle: 'Edytuj usługę montażu',
                    formMode: 'edit',
                    formAction: '/assemblies/edit',
                    navLocation: 'assem',
                    validationErrors: err.details,
                    defaultInputStyle: 'correct-input',
                
                });
            });    
        });
    });    


}

exports.deleteAssembly = (req,res,next)=>{

   const idAssembly = req.params.idAssembly;
   console.log(idAssembly);
   AssemblyRepository.deleteAssembly(idAssembly)
    .then( () => {
        res.redirect('/assemblies');
    })


}
