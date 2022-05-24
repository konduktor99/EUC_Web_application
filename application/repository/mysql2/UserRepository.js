const db = require('../../config/mysql2/db');
var authUtils = require('../../util/authUtils');



exports.findUserByLogin = (login) => {

    const query = 
    `SELECT * FROM User u WHERE u.login=?;`
    
    return db.promise().query(query, [login])
         .then( (results,fields)=>{
    
            const firstRow = results[0][0];
            // if(!firstRow){
            //     return {};
            // }
             
          return firstRow
    
         })
         .catch(err => {
            console.log(err);
            throw err;
    
         });
    
    
        
    };



        exports.register = (login, password) => {


         return checkLoginUnique(login)
         .then( err => { console.log(err);
            if(err){
                  return Promise.reject(err);
            } else {

               const hPassword = authUtils.hashPassword(password);
               const query = `INSERT INTO User (Login, Password) VALUES (?,?);`

               return db.promise().query(query, [login, hPassword]);
               
            }
         })
             
         };

         checkLoginUnique=(login)=> {

            let sql,promise;
        
          
                sql= `SELECT COUNT(1) as c FROM User where Login=? `
                promise = db.promise().query(sql, [ login]);
            
        
            return promise.then((results,fields) => {
        
                const count = results[0][0].c;
                let err = {};
                
                if(count>0){
                    
                    err = {
                        details: [{
                            path: ['register'],
                            message: 'Podany użytkownik już istnieje.'
                        }]
                    };      
                            return err;
                } 
        
           
            });
        
        
        };



         exports.signIn = (login, password) => {

            const query = 
            `SELECT * FROM User u WHERE u.login=?;`
            
            return db.promise().query(query, [login])
                 .then( (results,fields)=>{
            
                    const firstRow = results[0][0];
                    if(!firstRow){
                        return {};
                    }
                     
                  return firstRow
            
                 })
                 .catch(err => {
                    console.log(err);
                    throw err;
            
                 });
            
            
                
            };