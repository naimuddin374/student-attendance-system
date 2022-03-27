const express = require('express');
const connectDB = require('./db');
const app = express();


app.use(express.json())


app.get('*', (req, res) => {
    res.send(`Welcome to app`);
})



app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'Server Error Occurred!' });
})


// const uri = 'mongodb+srv://admin:pass123@shoppingcart.8ipvj.mongodb.net/test';
const uri = 'mongodb://localhost:27017/attendance-db';
connectDB(uri)
    .then(() => {
        console.log('Database Connection established!')
        app.listen(4000, () => {
            console.log(`Application running port 4000`);
        })
    })
    .catch(err => console.log(err))