var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var store = require('json-fs-store');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var router = express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// store.add({
//   name:'The_Alchemist',author:'Paulo Coelho',price:'₹350',quantity:'120',description:'The Alchemist follows the journey of an Andalusian shepherd boy named Santiago'},
//   function(err){
//     if (err) {
//       throw err;
//     }
//   }
// );

// var books=[
//   {name:'The_Alchemist',author:'Paulo Coelho',price:'₹350',quantity:'120',description:'The Alchemist follows the journey of an Andalusian shepherd boy named Santiago'},
//   {name:'Half_Girlfriend',author:'Chetan Bhagat',price:'₹350',quantity:'100',description:'Half Girlfriend is an Indian English coming of age, young adult romance novel by Indian author Chetan Bhagat'},
//   {name:'2_States',author:'Chetan Bhagat',price:'₹350',quantity:'180',description:'The Story of My Marriage commonly known as 2 States is a 2009 novel written by Chetan Bhagat.'},
// ]

router.get('/',function(req,res,next){
  res.render('index',{title:'Express'});
});

router.get('/books',function(req,res,next){
  store.list(function(err,books){
    res.render('books_view',{count:books.length,books:books});
  }
  )
  
});
router.get('/books_new',function(req,res,next){
  res.render('books_new',{});
});

router.post('/books_new',function(req,res,next){
  console.log(req.body);
  //books.push(req.body);
  //store.add(req.body,function(err,books));
  res.render('books_new',{});
});
router.post('/borrow_book',function(req,res,next){
  console.log(req.body.bookName);
  for(var i = 0 ; i < books.length; i++){
    if(books[i].name==req.body.bookName){
      console.log(books[i]);
      books[i].quantity-=1;
  }
}
store.list(function(err,books){
  res.render('books_view',{count:books.length,books:books});
}
)
});



//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use(router);


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

module.exports = app;
