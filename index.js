"use strict";

//
//
// Initializes Hull module
//
//

var hull = require('hull');

hull.conf({
  appId: process.env.HULL_APP_ID,
  orgUrl: process.env.HULL_ORG_URL,
  appSecret: process.env.HULL_APP_SECRET
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

app.listen(3010);
