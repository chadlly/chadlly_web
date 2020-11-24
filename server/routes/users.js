var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/userview/login.html'));
});

router.post('/login', function(req,res,next){

  var id = req.body.id;
  var pw = req.body.password;

  console.log("id: " + id);
  console.log("pw: " + pw);

  res.write('<html>');
  res.write('<body>');
  res.write('<h1>Hello, World!</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
  
})


module.exports = router;
