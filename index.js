const express = require('express');
const app = express();
const port = process.env.PORT || 88;

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true}));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-crud")

const userRoutes = require('./routes/users');
const eduRoutes = require('./routes/educational');
const tokenRoutes = require('./routes/tokens');

app.use('/api/user',userRoutes);
app.use('/api/education',eduRoutes);
app.use('/api/token',tokenRoutes);

app.listen(port, function() {
  console.log('listening on 88')
});

// // define a simple route
// app.get("/", (req, res) => {
//  res.sendFile(__dirname + "/views/index.html");
// });

// page not found
app.use((req,res,next) => {
	var error = new Error("Page Not Found");
	error.status = 404;
	next(error);
});

//error message 
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;