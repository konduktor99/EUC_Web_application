const db = require('../../config/mysql2/db');
const { required } = require('joi');
const assemSchema = require('../../model/joi/Assembly')

exports.getAssemblies = () => {
     
    const query =
    `SELECT a.idAssembly, u.brand, u.model, p.name, p.price as partPrice, p.availableQuantity, a.price, a.startDate, a.endDate, a.clientRemarks, a.clientName, a.clientNumber, u.idUnicycle, p.idPart 
    FROM Assembly a 
    LEFT JOIN Unicycle u ON u.idUnicycle=a.idUnicycle 
    LEFT JOIN Part p ON p.idPart=a.idPart`

    return db.promise().query(query)
    .then( (results,fields)=>{

        const assemblies = [];

        for(let i=0; i<results[0].length; i++){
            const row= results[0][i];
            
            const assembly= {
                idAssembly: row.idAssembly,
                price: row.price,
                startDate: row.startDate,
                endDate: row.endDate,
                clientRemarks: row.clientRemarks,
                clientName: row.clientName,
                clientNumber: row.clientNumber,

                unicycle: {
                    idUnicycle: row.idUnicycle,
                    brand: row.brand,
                    model: row.model
                },
                part: {
                    idPart: row.idPart,
                    name: row.name,
                    price: row.partPrice,
                    availableQuantity: row.availableQuantity
                }
            };
            assemblies.push(assembly);
        }

       console.log(assemblies);
       return assemblies;

    })
    .catch(err => {
       console.log(err);
       throw err;
    });

};

exports.getAssemblyById = (idAssembly) => {
     
    const query =
    `SELECT a.idAssembly, u.brand, u.model, p.name, p.price as partPrice, p.availableQuantity, a.price, a.startDate, a.endDate, a.clientRemarks, a.clientName, a.clientNumber, u.idUnicycle, p.idPart 
    FROM  Assembly a
    LEFT JOIN Unicycle u ON u.idUnicycle=a.idUnicycle 
    LEFT JOIN Part p ON p.idPart=a.idPart WHERE idAssembly = ?`

    return db.promise().query(query, [idAssembly])
    .then( (results,fields)=>{

        const row = results[0][0];
        if(!row){
            return {};
        }
                
            const assembly= {
                idAssembly: row.idAssembly,
                price: row.price,
                startDate: row.startDate,
                endDate: row.endDate,
                clientRemarks: row.clientRemarks,
                clientName: row.clientName,
                clientNumber: row.clientNumber,

                unicycle: {
                    idUnicycle: row.idUnicycle,
                    brand: row.brand,
                    model: row.model
                },
                part: {
                    idPart: row.idPart,
                    name: row.name,
                    price: row.partPrice,
                    availableQuantity: row.availableQuantity
                }
            };
      

       console.log(assembly);
       return assembly;

    })
    .catch(err => {
       console.log(err);
    });

};

exports.createAssembly = (newData) => {
    
   
    const vRes = assemSchema.validate( newData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

     
    
        if(checkDatesRelation(newData.startDate, newData.endDate)){
            return Promise.reject(checkDatesRelation(newData.startDate, newData.endDate));
        } else {
            const sql = 
            `INSERT INTO Assembly (price, startDate, endDate, clientRemarks,clientName,idUnicycle,idPart,clientNumber) VALUES (?,?,?,NULLIF(?,''),?,NULLIF(?,''),NULLIF(?,''),?)`;
            return db.promise()
            .execute(sql, [newData.price, newData.startDate,newData.endDate,newData.clientRemarks ,newData.clientName, newData.idUnicycle,newData.idPart, newData.clientNumber]);
        }

};

exports.updateAssembly = (idAssembly, data) => {
    
    const vRes = assemSchema.validate( data,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    if(checkDatesRelation(data.startDate, data.endDate)){
        return Promise.reject(checkDatesRelation(data.startDate, data.endDate));
    } else {
    
         const sql3 = 
        ` UPDATE Assembly SET price=?, startDate=?, endDate=?, clientRemarks=NULLIF(?,''), clientName=?, idUnicycle=NULLIF(?,''), idPart=NULLIF(?,''), clientNumber=? WHERE idAssembly=?;` 
        return db.promise()
            .execute(sql3, [data.price,data.startDate,data.endDate,data.clientRemarks ,data.clientName, data.idUnicycle ,data.idPart, data.clientNumber,idAssembly]);
        }

};

exports.deleteAssembly = (idAssembly) => {
    
    const sql = 'DELETE FROM Assembly WHERE idAssembly=?'

    return db.promise().execute(sql, [idAssembly]);


};

exports.deleteManyAssemblies = (assembliesIds) => {
    
    const sql = 'DELETE FROM Assembly WHERE idAssembly IN (?)'

    return db.promise().execute(sql, [assembliesIds]);


};

checkDatesRelation=(start, end)=> {

        let err = {};
        if(start!='' && end!='' && new Date(start) > new Date(end))  {  

            console.log(new Date(start));
            console.log(new Date(end));
            err = {
                details: [{
                    path: ['endDate','startDate'],
                    message: 'Data zakończenia nie może być wcześniej niż data rozpoczęcia.'
                }]
            };      
                    return err;
        }


};