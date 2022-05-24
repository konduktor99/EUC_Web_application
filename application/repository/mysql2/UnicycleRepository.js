const { required } = require('joi');
const db = require('../../config/mysql2/db');
const uniSchema = require('../../model/joi/Unicycle')

exports.getUnicycles = () => {

     return db.promise().query('select * from Unicycle')
     .then( (results,fields)=>{
         //console.log(results[0]);
         return results[0];
     })
     .catch(err => {
        console.log(err);
        throw err;

     });

};

// exports.getUniqueUnicycleBrands = () => {

//     return db.promise().query('select distinct brand from Unicycle')
//     .then( (results,fields)=>{
//         return results[0];
//     })
//     .catch(err => {
//        console.log(err);
//        throw err;

//     });

// };
// exports.getUniqueUnicycleModels = () => {

//     return db.promise().query('select distinct model from Unicycle')
//     .then( (results,fields)=>{
//         return results[0];
//     })
//     .catch(err => {
//        console.log(err);
//        throw err;

//     });

// };

exports.getUnicycleById = (idUnicycle) => {

const query = 
`SELECT u.brand, u.model, u.waterproofRating, u.price as uniPrice, u.availableQuantity as uniQuantity, u.motorPower, u.batteryCapacity, u.tireDiameter, p.name, p.price as partPrice, p.availableQuantity as partQuantity, p.idPart FROM Unicycle u 
LEFT JOIN Part p ON u.idUnicycle = p.idUnicycle WHERE u.idUnicycle=?;`

return db.promise().query(query, [idUnicycle])
     .then( (results,fields)=>{

        const firstRow = results[0][0];
        if(!firstRow){
            return {};
        }
         
        const unicycle = {
            idUnicycle: parseInt(idUnicycle),
            brand: firstRow.brand,
            model: firstRow.model,
            waterproofRating: firstRow.waterproofRating,
            price: firstRow.uniPrice,
            motorPower: firstRow.motorPower,
            availableQuantity: firstRow.uniQuantity,
            batteryCapacity: firstRow.batteryCapacity,
            tireDiameter: firstRow.tireDiameter,
            parts: [] 
        }

        for(let i=0; i<results[0].length; i++){
            const row= results[0][i];
            if(row.idPart){
                const part= {

                    idPart: row.idPart,
                    name: row.name,
                    price: row.partPrice,
                    availableQuantity: row.partQuantity
                }
                unicycle.parts.push(part);
            };
            
        }
        console.log(unicycle);
        return unicycle;

     })
     .catch(err => {
        console.log(err);
        throw err;

     });


    
};

exports.createUnicycle = (newUniData) => {


    const vRes = uniSchema.validate( newUniData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkBrandModelUnique(newUniData.brand, newUniData.model)
    .then( uniErr => { console.log(uniErr);
        if(uniErr){
            return Promise.reject(uniErr);
        } else {

    const idUnicycle = newUniData.idUnicycle;
    const brand = newUniData.brand; 
    const model = newUniData.model; 
    const waterproofRating = newUniData.waterproofRating;
    const price = parseInt(newUniData.price); 
    const availableQuantity = parseInt(newUniData.availableQuantity);
    const motorPower = parseInt(newUniData.motorPower);  
    const batteryCapacity = parseInt(newUniData.batteryCapacity); 
    const tireDiameter = parseInt(newUniData.tireDiameter);
    const sql = `INSERT INTO Unicycle (brand, model, waterproofRating, price, availableQuantity, motorPower, batteryCapacity, tireDiameter) VALUES (?,?,NULLIF(?,''),?,?,?,?,?)`
    return db.promise().execute(sql, [brand, model, waterproofRating, price, availableQuantity, motorPower, batteryCapacity, tireDiameter]);

        }

    }).catch( err => {
        return Promise.reject(err);
    })

    

};

exports.updateUnicycle = (idUnicycle, uniData) => {
    

    const vRes = uniSchema.validate( uniData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    return checkBrandModelUnique( uniData.brand, uniData.model, idUnicycle)
    .then( emailErr => {
        if(emailErr){
            return Promise.reject(emailErr);
        } else {

    const brand = uniData.brand; 
    const model = uniData.model; 
    const waterproofRating = uniData.waterproofRating;
    const price = parseInt(uniData.price); 
    const availableQuantity = parseInt(uniData.availableQuantity);
    const motorPower = parseInt(uniData.motorPower);  
    const batteryCapacity = parseInt(uniData.batteryCapacity); 
    const tireDiameter = parseInt(uniData.tireDiameter);
    const sql = `UPDATE Unicycle SET brand=?, model=?, waterproofRating=NULLIF(?,''), price=?, availableQuantity=?, motorPower=?, batteryCapacity=?, tireDiameter=? where idUnicycle=?`
    return db.promise().execute(sql, [brand, model, waterproofRating, price, availableQuantity, motorPower, batteryCapacity, tireDiameter, idUnicycle]);
    }

    }).catch( err => {
        return Promise.reject(err);
    })

};

exports.deleteUnicycle = (idUnicycle) => {
    
    const sql1 = 'DELETE FROM Assembly where idUnicycle=?'
    const sql2 = 'DELETE FROM Part where idUnicycle=?'
    const sql3 = 'DELETE FROM Unicycle where idUnicycle=?'


    return db.promise().execute(sql1, [idUnicycle])
      .then(() => {
        return db.promise().execute(sql2,[idUnicycle])
    }).then(() => {
        return db.promise().execute(sql3,[idUnicycle])
    });


};

checkBrandModelUnique=(brand,model, idUnicycle)=> {

    let sql,promise;

    if(idUnicycle){
        sql= `SELECT COUNT(1) as c FROM Unicycle where idUnicycle!=? and brand=? and model=?`
        promise = db.promise().query(sql, [idUnicycle, brand, model]);
    } else {
        sql= `SELECT COUNT(1) as c FROM Unicycle where brand=? and model=?`
        promise = db.promise().query(sql, [ brand, model]);
    }

    return promise.then((results,fields) => {

        const count = results[0][0].c;
        let err = {};
        if(count>0){
            
            err = {
                details: [{
                    path: ['brand','model'],
                    message: 'Taki monocykl juz istnieje w bazie.'
                }]
            };
                    
                    return err;
        } 

   
    });


}