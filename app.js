const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
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

app.post("/api/products", (req, res, next) => {
	delete req.body._id;
	const product = new Product({
		...req.body,
	});
	product
		.save()
		.then(() => res.status(201).json({ product }))
		.catch((error) => res.status(400).json({ error }));
});

app.get("/api/products/:id", (req, res, next) => {
	Product.findOne({ _id: req.params.id })
		.then((product) => res.status(200).json({ product }))
		.catch((error) => res.status(404).json({ error }));
});

app.get("/api/products/", (req, res, next) => {
	Product.find()
		.then((products) => res.status(200).json({ products }))
		.catch((error) => res.status(400).json({ error }));
});

app.use((req, res) => {
	res.json({ message: "Request received!" });
});

module.exports = app;
