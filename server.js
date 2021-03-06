// require the things
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require('./models');

// set up server
var app = express();
var port = process.env.PORT || 8080;
// app.listen(port);


db.sequelize.sync({force: true}).then(function(){
	app.listen(port, function() {
		console.log("listening on port %", port);
	});
});

// set up handlebars engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// get them routes
require('./controllers/burgers_controller.js')(app);