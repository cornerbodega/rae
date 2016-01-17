var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database Connected');
});

console.log('I am the DB!');
