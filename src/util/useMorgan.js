const morgan = require('morgan');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');



const accessLogStream = fs.createWriteStream(path.resolve(__dirname, '../../logs/access.log'), { flags: 'a' })
morgan.token('request-id', () => uuid.v4())



const prodFormat = (tokens, req, res) => {
    return JSON.stringify({
        method: tokens['method'](req, res),
        status: tokens['status'](req, res),
        url: tokens['url'](req, res),
        requestId: tokens['request-id'](req, res),
    })
}


const useMorgan = (app) => {
    if (process.env.NODE_ENV?.trim() === 'production') {
        app.use(morgan(prodFormat, { stream: accessLogStream }))
    } else {
        app.use(morgan('dev', {
            skip: (_req, res) => {
                return res.statusCode < 400;
            },
            stream: process.stderr,
        }))

        app.use(morgan('dev', {
            skip: (_req, res) => {
                return res.statusCode >= 400;
            },
            stream: process.stderr,
        }))
    }
}



module.exports = useMorgan;