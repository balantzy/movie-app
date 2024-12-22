require('dotenv').config();
const app = require("./server");
// const ReviewsDAO = require("./dao/reviewsDAO.js");
const connectDB = require('./db/connect');


const port = process.env.PORT || 3000;

const start = async () => {
    try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on PORT ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();