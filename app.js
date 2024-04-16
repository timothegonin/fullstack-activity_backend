const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
	.connect(
		"mongodb+srv://" +
			process.env.API_USER +
			":" +
			process.env.API_USER_PASS +
			"@cluster0.bmwa1ot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use((req, res) => {
	res.json({ message: "Request received!" });
});

module.exports = app;
