const express = require('express');
const bodyParser = require('body-parser');
// const employees = require('./app/controllers/employees_controller');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Get employeesPort on which the APIs will run
const {employeesPort} = require('./config/api.config');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to Employees API. User this API for Rest API Testing"});
// });

let employees = require('./app/routes/employees_routes');
app.use('/', employees);

// require('./app/routes/employees_routes.js')(app);

// listen for requests
app.listen(employeesPort, () => {
    console.log(`Server is listening on employeesPort ${employeesPort}`);
});


module.exports = app;