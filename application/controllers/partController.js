const PartRepository = require ('../repository/mysql2/PartRepository');
const UnicycleRepository = require ('../repository/mysql2/UnicycleRepository');



exports.showPartList = (req,res,next)=>{

    PartRepository.getParts()
    .then(parts => 
        {

            res.render('pages/part/list',{

                parts: parts,
                navLocation: 'part'
                
            });
            console.log(parts);


        });
    

}

exports.showAddPartForm = (req,res,next)=>{


     UnicycleRepository.getUnicycles()
    .then(unis => {
        
            
            
              

                res.render('pages/part/form',{
    
                    part: {},
                    unis:unis,
                    pageTitle: 'Dodaj część',
                    formMode: 'createNew',
                    formAction: '/parts/add',
                    navLocation: 'part',
                    validationErrors: [],
                    defaultInputStyle: '',
                    submittedFirstTime: ''
                    
                });

                
         
        });
      
  
}

exports.showPartDetails = (req,res,next)=>{

    const idPart = req.params.idPart;
    PartRepository.getPartById(idPart)
    .then(part => 
        {

            res.render('pages/part/details',{

                part: part,
                navLocation: 'part'
                
            });
        });    


}

exports.showEditPartForm = (req,res,next)=>{

    const idPart = req.params.idPart;
    
        UnicycleRepository.getUnicycles()
        .then(unis => {
            PartRepository.getPartById(idPart)
            .then(part => 
            {

               

                res.render('pages/part/form',{
    
                    part: part,
                    unis:unis,
                    pageTitle: 'Edytuj część',
                    formMode: 'edit',
                    formAction: '/parts/edit',
                    navLocation: 'part',
                    validationErrors: [],
                    defaultInputStyle: ''
                    
                });
              console.log(part);
            });  
        });
      
}

exports.addPart = (req,res,next)=>{


    const partData = {
        
        name: req.body.name,
        availableQuantity: req.body.availablePartQuantity,
        price: req.body.price,
        type: req.body.type,
        unicycle: {
            idUnicycle: req.body.forUnicycle,
            brand: req.body.brand,
            model: req.body.model
        }
      
      
     };

     console.log(partData);
      PartRepository.createPart(partData)
      .then( result => {
          res.redirect('/parts');
      })
      .catch( err => {
        UnicycleRepository.getUnicycles()
        .then(unis => {

            res.render('pages/part/form',{
            
                part: partData,
                unis:unis,
                pageTitle: 'Dodaj część',
                formMode: 'addAfterReject',
                formAction: '/parts/add',
                navLocation: 'part',
                validationErrors: err.details,
                defaultInputStyle: 'correct-input',
                submittedFirstTime: 'validate'
            });
        });
        console.log(err);
      });

}

exports.updatePart = (req,res,next)=>{

    const idPart = req.body.idPart;
  
    const partData = {
        
        idPart: idPart,
        name: req.body.name,
        availableQuantity: req.body.availablePartQuantity,
        price: req.body.price,
        type: req.body.type,
        unicycle: {
            idUnicycle: req.body.forUnicycle,
            brand: req.body.brand,
            model: req.body.model
        }
       
     };
     console.log(idPart);
     console.log(partData);
       
    PartRepository.updatePart(idPart, partData)
    .then( result => {
        res.redirect('/parts');
    })
    .catch( err => {

        UnicycleRepository.getUnicycles()
        .then(unis => {
            res.render('pages/part/form',{
            
                part: partData,
                unis:unis,
                pageTitle: 'Edytuj część',
                formMode: 'edit',
                formAction: '/parts/edit',
                navLocation: 'part',
                validationErrors: err.details,
                defaultInputStyle: 'correct-input'
            });
        });
        console.log(err);
      });


}

exports.deletePart = (req,res,next)=>{

   const idPart = req.params.idPart;
   console.log(idPart);
   PartRepository.deletePart(idPart)
    .then( () => {
        res.redirect('/parts');
    })


}