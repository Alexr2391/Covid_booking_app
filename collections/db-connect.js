const mongoose = require('mongoose')
require('custom-env').env()
const dbUrl = process.env.DB_URL
const Testurl = process.env.DB_TEST_URL


function dbConnect() {

    mongoose.Promise = global.Promise

    mongoose.connect(dbUrl, {
        useUnifiedTopology : true,
        useNewUrlParser : true, 
        useCreateIndex : true
    })

    const db = mongoose.connection

    db.once('open' , () => {
        console.log('mongo db-connected')
    })

    db.on('error', (err, db) => {
        if(err) throw err;
    })

}

module.exports = Connection = dbConnect