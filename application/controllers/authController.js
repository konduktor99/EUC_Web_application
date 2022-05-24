const UserRepository = require ('../repository/mysql2/UserRepository');
var authUtil = require('../util/authUtils');


exports.login = (req,res,next)=>{

    const login = req.body.login;
    const password = req.body.password;
    UserRepository.findUserByLogin(login)
    .then(user => {
        if(!user){
            res.render('index', {
                navLocation: '',
                loginError: "Nieprawidłowy login lub hasło"
            })
        } else if(authUtil.comparePasswords(password,user.password)===true){
            //console.log(window.location.href);
            req.session.loggedUser = user;
            res.redirect('/');
        } else {
            res.render('index', {
                navLocation: '',
                loginError: "Nieprawidłowy login lub hasło"
            })
        }
    })
    .catch(err => {
        console.log(err);
     });
   
   

}

exports.logout = (req,res,next)=>{

    req.session.loggedUser = undefined;
    res.redirect('/');
   
}



exports.register = (req,res,next)=>{

    const login = req.body.login;
    const password = req.body.password;
    if(login){
    UserRepository.register(login,password)
    .then(result => {
       
            req.session.loggedUser = req.body;
            res.redirect('/');
    })
    .catch(err => {
        res.render('index', {
        navLocation: '',
        registerError: "Taki użytkownik już istnieje"
        })
     });
    }
    
  
    //res.redirect('/');
    
   
   

}

