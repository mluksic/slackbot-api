const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
    "mongodb://" +
        process.env.MONGO_ATLAS_USERNAME +
        ":" +
        process.env.MONGO_ATLAS_PW +
        "@node-rest-shop-shard-00-00-hzk9a.mongodb.net:27017,node-rest-shop-shard-00-01-hzk9a.mongodb.net:27017,node-rest-shop-shard-00-02-hzk9a.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true",
    { useNewUrlParser: true }
);

/* 
MIDDLEWARE
*/

// morgan param 'dev' format
app.use(morgan("dev"));

// extract JSON and URLENCODED data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS header
app.use((res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Methods", "PUT, POST, GET, DELETE");
        return res.status(200).json();
    }
    next();
});
// Routes for handling requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
