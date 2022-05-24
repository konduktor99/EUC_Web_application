var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/LangController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});

//mp3 internacjonalizacja
router.get('/changeLang/:lang', LangController.changeLang);

router.post('/login', AuthController.login); //mp3
router.get('/logout', AuthController.logout);

router.post('/register', AuthController.register); //mp3



module.exports = router;
