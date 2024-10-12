const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
require('dotenv').config();

const app = new express();

const dbConnection = require('./config/db.config');

const AuthRoutes = require ("./routes/auth.routes");
const { NotFound, ErrorHandler } = require("./middlewares/error.middlewares");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
    origin:process.env.REACT_APP_FRONTEND_URL,
    credentials:true
}))

app.use("/api/auth" , AuthRoutes);

app.use(NotFound);
app.use(ErrorHandler);

app.listen(PORT, () => {
    try {
        console.log(`Server is listening on ${PORT}`);
        dbConnection();
    } catch (error) {
        console.error("Error: Server is not listening", error.message);
    }
})
