var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Express 기본 모듈 불러오기
var http = require('http');

var MongoClient = require('mongodb').MongoClient;

var database;
var users;

function connectDB(){
	var databaseUrl = 'mongodb://localhost:8080';

	MongoClient.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err,db){
	if(err){
	        console.log('데이터 베이스 연결 에러 발생 !');
		return; 
	}
        console.log('데이터베이스 연결 -> ' + databaseUrl);
        database = db.db('local');
        users = database.collection("user");
        console.log("db connected!");
    });
}   
    
connectDB(); 


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//익스프레스 객체 생성 및 설정ㄴ
app.set('port', process.env.PORT || 3000);


//서버시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버 시작. 포트 -> ' + app.get('port'));
});
