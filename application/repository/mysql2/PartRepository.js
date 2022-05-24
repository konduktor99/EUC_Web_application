const db = require('../../config/mysql2/db');
const { required } = require('joi');
const partSchema = require('../../model/joi/Part')
exports.getParts = () => {
     
    const query =
    `SELECT p.idPart, p.name, p.price, p.availableQuantity, p.type, u.idUnicycle, u.brand, u.model 
    FROM Part p 
    LEFT JOIN Unicycle u 
    ON p.idUnicycle=u.idUnicycle`

    return db.promise().query(query)
    .then( (results,fields)=>{

        const parts = [];

        for(let i=0; i<results[0].length; i++){
            const row= results[0][i];
            
            const part= {
                idPart: row.idPart,
                name: row.name,
                price: row.price,
                availableQuantity: row.availableQuantity,
                type: row.type,
            
                unicycle: {
                    idUnicycle: row.idUnicycle,
                    brand: row.brand,
                    model: row.model
                }
                
            };                
            parts.push(part);
        }

       
       return parts;

    })
    .catch(err => {
       console.log(err);
    });

};

exports.getPartById = (idPart) => {

const query = 
`SELECT  p.name, p.price, p.availableQuantity, p.type, u.idUnicycle, u.brand, u.model FROM Part p 
LEFT JOIN Unicycle u 
ON p.idUnicycle=u.idUnicycle 
WHERE idPart=?;`

return db.promise().query(query, [idPart])
     .then( (results,fields)=>{

        const row = results[0][0];
        if(!row){
            return {};
        }
         
        const part= {
            idPart: parseInt(idPart),
            name: row.name,
            price: row.price,
            availableQuantity: row.availableQuantity,
            type: row.type,
        
            unicycle: {
                idUnicycle: row.idUnicycle,
                brand: row.brand,
                model: row.model
            }
            
        };

        return part;

     })
     .catch(err => {
        console.log(err);
     });


    
};
exports.createPart = (newData) => {
    
    
    const vRes = partSchema.validate( newData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNameUnique(newData.name)
    .then( nameErr => { 
        if(nameErr){
            return Promise.reject(nameErr);
        } else {

        const sql =`INSERT INTO Part( name, availableQuantity, price, type, idUnicycle) VALUES (?,?,?,?, NULLIF(?,''))`
        console.log(newData);
        return db.promise().execute(sql, [newData.name,parseInt(newData.availableQuantity),newData.price,newData.type,newData.unicycle.idUnicycle]);
    }

    }).catch( err => {
        return Promise.reject(err);
    })

};

exports.updatePart = (idPart, data) => {
  
    
    const vRes = partSchema.validate( data,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNameUnique(data.name,data.idPart)
    .then( nameErr => { 
        if(nameErr){
            return Promise.reject(nameErr);
        } else {

        const sql =`UPDATE Part SET name=?,availableQuantity=?,price=?,type=?,idUnicycle=NULLIF(?,'') WHERE idPart=?;`
        return db.promise().execute(sql, [data.name,parseInt(data.availableQuantity),data.price,data.type,data.unicycle.idUnicycle, idPart]);
        }
    }).catch( err => {
        return Promise.reject(err);
    })
};

exports.deletePart = (idPart) => {
    
    
    const sql1 = 'DELETE FROM Assembly where idPart=?'
    const sql2 = 'DELETE FROM Part where idPart=?'


    return db.promise().execute(sql1, [idPart])
      .then(() => {
        return db.promise().execute(sql2,[idPart])
    
    });


};
checkNameUnique=(name, idPart)=> {

    let sql,promise;

    if(idPart){
        sql= `SELECT COUNT(1) as c FROM Part where idPart!=? and name=? `
        promise = db.promise().query(sql, [idPart, name]);
    } else {
        sql= `SELECT COUNT(1) as c FROM Part where name=? `
        promise = db.promise().query(sql, [ name]);
    }

    return promise.then((results,fields) => {

        const count = results[0][0].c;
        let err = {};
        console.log(count);
        if(count>0){
            
            err = {
                details: [{
                    path: ['name'],
                    message: 'Taka część juz istnieje w bazie.'
                }]
            };      
                    return err;
        } 

   
    });


};