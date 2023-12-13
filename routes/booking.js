var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/house', function (req, res) {
  console.log('hello hoyse');
  // res.send('./src/app/housing/housing.component.html');
  // res.render('housing', { title: 'Express' }); 
  //Возникает ошибка птому что не установлен шаблонизатор
});

router.get('/air', function (req, res, next) {
  res.render('app-air-tickets', { title: 'Express' });
});

router.get('/car', function (req, res, next) {
  res.render('car-rental', { title: 'Express' });
});
module.exports = router;
