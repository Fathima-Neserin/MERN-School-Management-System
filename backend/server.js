const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
require('dotenv').config();

const app = new express();

const dbConnection = require('./config/db.config');

const AuthRoutes = require ("./routes/auth.routes");
const UserRoutes = require("./routes/user.routes");
const StudentRoutes = require("./routes/student.routes");
const LibraryRoutes = require("./routes/library.routes");
const FeesRoutes = require("./routes/fees.routes");

const { NotFound, ErrorHandler } = require("./middlewares/error.middlewares");


const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
    origin:process.env.REACT_APP_FRONTEND_URL,
    credentials:true
}))

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/student", StudentRoutes);
app.use("/api/library/history", LibraryRoutes);
app.use("/api/fees/history", FeesRoutes);

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
