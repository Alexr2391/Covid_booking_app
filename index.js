const express = require('express')
const Nodemailer = require('./mailer/nodemailer')
const Connection = require('./collections/db-connect.js')
require('custom-env').env()
const Booking = require ('./Models/Bookings.js')
const {config} = require ('./Models/storeConfig.js')
const login = require('./routes/login.js')
const backoffice = require('./routes/backoffice.js')
const app = express()
const port = 3000
const fs = require('fs')

const csso = require('csso')

const css = fs.readFileSync('public/css/style.css', 'utf8')
csso.minify(css, {
  filename: 'public/css/style.css', // will be added to source map as reference to source file
  sourceMap: true             // generate source map
})


const dbUrl = process.env.DB_URL
const Testurl = process.env.DB_TEST_URL

const session = require('express-session')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))


// ----------- Sessions  -----------------|



const MongoDBStore = require('connect-mongodb-session')(session)

const store = new MongoDBStore({
  uri: dbUrl, 
  collection : 'sessions'
}
)

app.use(session({
  secret: 'testloggin',
  resave: false, 
  saveUninitialized: false, 
  store: store
}))

// ------------ ROUTER ---------------------------

app.use('/login', login)
app.use('/web', backoffice)

//-------------MONGO DB CONNECT  ---------------

Connection()

 // Routes GET ----------------------------------------------------

app.get('/', (req, res, next) => {
      const checkSuccess = req.query.success || null
      let message = {}
      if(checkSuccess !== null) {
        message.success = `Η κράτηση σας έγινε με επιτυχία! σύντομα θα λάβετε την επιβεβαίωση μέσω email`;
        message.class = 'headMessage'
      }
      res.render('home', {message : message || null})
})


app.get('/getstoreconfig', (req, res) => {
  return res.json(config)
}) 

app.get('/404', (req,res, next) => {
  return res.redirect(301, '/')
})

app.get('*', (req, res, next)=> {
    setTimeout(() => {
      res.redirect(301, '/')
    },1000)
})

  

// Routes POST ----------------------------------------------------

app.post('/', async(req, res, next) => {
  const countAvailability = req.body.checkAvailability;
  const storeId = req.body.store_id
  try{
    let availabilityCount = []

    await countAvailability.map((value) =>{
      availabilityCount.push(
        Booking.countDocuments({date: value, store : storeId}).exec()
        .then((resultCount) => ({dataset: value, count : resultCount}))
      )
    })
     const result = await Promise.allSettled(availabilityCount)
    
     return res.json(result)


  } catch (err){
    res.end()
  }
})



app.post('/emailer', async(req, res, next) => {

  const id = req.body.id
  const alert = req.body.alert || null
  try {

    const mailerData = await Booking.findById(id).exec()

    if(alert !== null) {
      Nodemailer(mailerData, '/cancelreservation.ejs', 'Ακύρωση Κράτησης Decathlon').catch(console.error)
    }
    else {
      Nodemailer(mailerData).catch(console.error)
    }
      

      const {email} = mailerData

      return res.send(`email sent to ${email}`)

  }
  catch (err) {
    res.send(err)
  }

})




app.post('/bookingTransfer', async(req, res, next) => {
  try{
    const formData = {
        name: req.body.name, 
        lname: req.body.lname, 
        email: req.body.email, 
        tel: req.body.tel, 
        store: req.body.store,
        date: req.body.date, 
        submitDate: req.body.submitDate
    }

    const postDataValues = Object.values(formData);


    const validateEntries = postDataValues.every(e => e !== '')

    if(validateEntries) {

      Booking.create(formData, (err, docs) => {

        if(err) {
         return res.send({
            message: '* Προέκυψε σφάλμα κατά την διάρκεια της καταχώρησης', 
            error: 1
          })
        }

        else {

          Nodemailer(formData).catch(console.error);

          let message = `Thank you ${formData.name}, , you will soon receive your confirmation email at ${formData.email}. See you at ${formData.date} !`

         return res.send({'success' : message})
        }
      })
    } 
  } catch (err) {
   return res.status(204).send('failed') 
  }
    
});




app.listen(process.env.PORT || port, () => {
  console.log(`listening to  ${process.env.PORT || port}`)
})
