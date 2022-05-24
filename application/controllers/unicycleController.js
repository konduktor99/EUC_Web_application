const UnicycleRepository = require ('../repository/mysql2/UnicycleRepository');


exports.showUnicycleList = (req,res,next)=>{

    UnicycleRepository.getUnicycles()
    .then(unis => 
        {

            res.render('pages/unicycle/list',{

                unis: unis,
                navLocation: 'uni'
                
            });


        });
    

}

exports.showAddUnicycleForm = (req,res,next)=>{

    res.render('pages/unicycle/form',{
        
        uni: {},
        pageTitle: req.__('uni.form.add.pageTitle'),
        formMode: 'createNew',
        //btnLabel: 'Dodaj monocykl',
        formAction: '/unicycles/add',
        navLocation: 'uni',
        validationErrors: [],
        defaultInputStyle: '',
        submittedFirstTime: ''
    });

}

exports.showUnicycleDetails = (req,res,next)=>{

    const idUnicycle = req.params.idUnicycle;
    UnicycleRepository.getUnicycleById(idUnicycle)
    .then(uni =>{
        res.render('pages/unicycle/details',{

            uni: uni,
            navLocation: 'uni'
        });

    });    

}

exports.showEditUnicycleForm = (req,res,next)=>{

    const idUnicycle = req.params.idUnicycle;
    UnicycleRepository.getUnicycleById(idUnicycle)
    .then(uni =>{ 
        res.render('pages/unicycle/form',{

            uni: uni,
            pageTitle: req.__('uni.form.edit.pageTitle'),
            formMode: 'edit',
            formAction: '/unicycles/edit',
            navLocation: 'uni',
            validationErrors: [],
            defaultInputStyle: ''
        });

    });    

}

exports.addUnicycle = (req,res,next)=>{

    // const uniData = { ...req.body };

    
    const uniData = {
        
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        availableQuantity: req.body.availableQuantity,
        motorPower: req.body.motorPower,
        batteryCapacity: req.body.batteryCapacity,
        tireDiameter: req.body.tireDiameter,
        waterproofRating: req.body.waterproofRating,
     };
      UnicycleRepository.createUnicycle(uniData)
      .then( result => {
          res.redirect('/unicycles');
      })
      .catch( err => {

        res.render('pages/unicycle/form',{
        
            uni: uniData,
            pageTitle: req.__('uni.form.add.pageTitle'),
            formMode: 'createNew',
            //btnLabel: 'Dodaj monocykl',
            formAction: '/unicycles/add',
            navLocation: 'uni',
            validationErrors: err.details,
            defaultInputStyle: 'correct-input',
            submittedFirstTime: 'validate'
        });
        console.log(err);
      });


}

exports.updateUnicycle = (req,res,next)=>{

    const idUnicycle = req.body.idUnicycle;
    //var uniData;

    UnicycleRepository.getUnicycleById(idUnicycle)
    .then(uni =>{ 
     const uniData = {

        idUnicycle: req.body.idUnicycle,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        availableQuantity: req.body.availableQuantity,
        motorPower: req.body.motorPower,
        batteryCapacity: req.body.batteryCapacity,
        tireDiameter: req.body.tireDiameter,
        waterproofRating: req.body.waterproofRating,
        parts: uni.parts
     };
    
    
       
    UnicycleRepository.updateUnicycle(idUnicycle, uniData)
    .then( result => {
        res.redirect('/unicycles');
    })
    .catch( err => {

        res.render('pages/unicycle/form',{
        
            uni: uniData,
            pageTitle: req.__('uni.form.edit.pageTitle'),
            formMode: 'edit',
            //btnLabel: 'Dodaj monocykl',
            formAction: '/unicycles/edit',
            navLocation: 'uni',
            validationErrors: err.details,
            defaultInputStyle: 'correct-input'
          
        });  console.log(err.details);
        console.log(uniData);
      });

    });
}

exports.deleteUnicycle = (req,res,next)=>{

   const idUnicycle = req.params.idUnicycle;
   console.log(idUnicycle);
   UnicycleRepository.deleteUnicycle(idUnicycle)
    .then( () => {
        res.redirect('/unicycles');
    })


}


