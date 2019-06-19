var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 65214);


app.get('/',function(req,res){

  // get the parameters from the url query
  var theParams = [];
  //console.log(req.query);
  for (var param in req.query){
    var newObj = {};
    newObj.name = param;
    newObj.value = req.query[param];
    theParams.push(newObj);
  }
  //console.log(theParams);

  // set the context and render the home view
  var context = {};
  context.urlParams = theParams;
  context.bodyParams = [];
  context.theReq = "GET";
  res.render('home', context); 
});


app.post('/',function(req,res){

  // get the parameters from the url query
  var theParams = [];
  //console.log(req.query);
    for (var param in req.query){
    var newObj = {};
    newObj.name = param;
    newObj.value = req.query[param];
    theParams.push(newObj);
  }
  //console.log(theParams);

  // get the parameters from the POST body
  var theBody = [];
  for (var param in req.body) {
    var newObj = {};
    newObj.name = param;
    newObj.value = req.body[param];
    theBody.push(newObj);
  }
  //console.log("The body:");
  //console.log(theBody);

  // set the context and render the home view
  var context = {};
  context.urlParams = theParams;
  context.bodyParams = theBody;
  context.theReq = "POST";
  res.render('home', context); 
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});