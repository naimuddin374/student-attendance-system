const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');


const app = express();
app.use(morgan('dev'));
const routers = require('./routes');

app.use(express.json());
app.use(routers);



app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : 'Server Error Occurred!';
    res.status(status).json({ message });
})


const uri = 'mongodb://0.0.0.0:27017/attendance-db';
connectDB(uri)
    .then(() => {
        console.log('Database Connection established!')
        app.listen(4000, () => {
            console.log(`Application running port 4000`);
        })
    })
    .catch(err => console.log(err))