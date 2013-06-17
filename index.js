"use strict";

//
//
// Initializes Hull module
//
//

var hull = require('hull');

hull.conf({
  appId: "50f992c179ab99a7ca000007",
  orgUrl: "http://maisheull.hullapp.dev",
  appSecret: "a55a8f694783c4f0c1dee7fd6ca9ad09"
});


var app = require('./config/app')();

app.use('/use_passport', require('./lib/use_passport'));
app.use('/use_hull', require('./lib/use_hull'));
app.use(app.router);


//
//
// ROUTES
//
//

app.get('/', function (req, res, next){
  res.redirect('/use_hull');
});

app.listen(3000);
