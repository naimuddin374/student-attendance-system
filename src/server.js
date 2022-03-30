const express = require('express');
const connectDB = require('./db');
const useMorgan = require('./util/useMorgan');
const app = express();
const routers = require('./routes');
const logger = require('./util/logger');


useMorgan(app)
app.use(express.json());
app.use(routers);





app.use((err, _req, res, _next) => {
    logger.error(err)
    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : 'Server Error Occurred!';
    res.status(status).json({ message });
})

logger.warn('I am warn')
logger.debug('I am debug')
logger.error('I am error')
logger.info('I am info')


connectDB('mongodb://0.0.0.0:27017/attendance-db')
    .then(() => {
        logger.log('info', 'Database Connection established!')
        app.listen(4000, () => {
            logger.info(`Application running port 4000`);
        })
    })
    .catch(err => logger.error(err))