var fs      = require('fs');
var express = require('express');
var path    = require('path');
var mod     = require('./profiles');

var app  = express();
var port = 3000;
var profiles = [];
 
// Config
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */

    app.use(express.bodyParser({
		uploadDir: __dirname + '/photos/',
		keepExtensions: true
	}));

    app.use(express.static(__dirname + '/public'));
});

// Methods
function saveData() {
	fs.writeFile(__dirname + '/db.json', JSON.stringify(profiles), function (err) {
		if (err) throw err;
		console.log('Saved database.');
	});
}

// Router
app.get('/profiles', function(req, res) {
	// Return list
	res.json(profiles);
});

app.post('/create', function(req, res) {
	// Create profile.

	console.log("Create profile:");
	console.log("  Name: %s", req.body.name);
	console.log("  Surname: %s", req.body.surname);
	console.log("  LC: %s", req.body.lc);
	console.log("  Rol: %s", req.body.rol);
	console.log("  img: %s", req.files.photo.path);
	console.log();

	var p = new mod.profile();
	var d = {
		id      : p.id(),
		name    : p.name(req.body.name),
		surname : p.surname(req.body.surname),
		lc      : p.lc  (req.body.lc),
		rol     : p.rol (req.body.rol),
		photo   : p.photo(path.basename(req.files.photo.path))
	}

	profiles.push(d);
	saveData();

	res.redirect('/');
});

app.get('/profile/:id', function(req, res) {
	// Download image
	var p = req.params.id;
	if (p == 'unknown') {
		// Return unknown img
		res.redirect('unknown.jpg');
	} else {
		// Find profile
		var found = false;
		profiles.forEach(function(i){
			if (!found && i.id == p) {
				res.sendfile(__dirname + '/photos/' + i.photo);
				found = true;
			}
		});
		if (!found) res.redirect('unknown.jpg'); // Not found
	}
});

// Not Found

app.get('*', function(req, res, next) {
	res.send('404. Not found.');
	console.log('NOT FOUND: %s %s', req.method, req.url);
});

// Load local database
if (fs.existsSync('./db.json')) {
	console.log('Importing saved data...');
	profiles = require('./db.json');
}

// Start server
app.listen(port);
console.log('Listening on port %d...', port);