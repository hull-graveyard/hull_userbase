var express = require('express'),
    app = express(),
    useHull = require('./lib/use_hull'),
    usePassport = require('./lib/use_passport');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: "Na na na, I'm secret!" }));
app.use(app.router);

useHull(app);
usePassport(app);


app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3023);
