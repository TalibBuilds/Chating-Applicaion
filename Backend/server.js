require('dotenv').config();
const app = require('./src/app.js');
const connectDB = require('./src/config/db')
const dns = require('dns')

dns.setServers([
    '8.8.8.8',
    '8.8.4.4',
    '1.1.1.1'
])

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(`${PORT}`, () => {
    console.log(`server is running port ${PORT} `)
});