const { Client } = require('pg');

const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    ssl: { rejectUnauthorized: false }
})

client.connect()
.then(client => {
    console.log('connected')
})
.catch(err => console.log('connection err', err))

module.exports = client