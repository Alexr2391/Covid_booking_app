const Connection = require('./db-connect.js')
const Booking = require('../Models/Bookings.js')



//---------- MONGO CONNECT -------------------------------

Connection()

// -------------------------------------------------------

async function getAllreservations(req, res, next) {

    if(!req.session.isLoggedIn) {
      return res.redirect(301, '/login')
    }
   
    try {

    const query = req.query
    const maxAllowedNum = 600
    const allFilters = await Booking.find({}).exec()
      
    if(query.time && query.store) {

      const showResults = await Booking.find({
        date: query.time === 'All'
        ? {$regex: /\w/, $options: 'gi'}
        : query.time, 
        store: query.store === 'All'
        ? {$regex: /\w/, $options: 'gi'}
        : query.store})
        .sort({_id: -1}).limit(maxAllowedNum).exec()

      return res.render('backoffice',{response : showResults, filters : allFilters, query: query, max: maxAllowedNum})
    }

    if(!query.time || !query.store) {
        const showResults = await Booking.find({}).sort({_id: -1}).limit(maxAllowedNum).exec()
        return res.render('backoffice',{response : showResults, filters : allFilters,query: '',max: maxAllowedNum})
      }


      return res.redirect('/')
    }
  
    catch {
      return res.render('backOffice')
    }
  
  }


async function deleteReservations(req, res, next) {

    try {
        const deleteEntry = req.body.id
        await Booking.deleteOne({_id: deleteEntry})
          .exec()
        return res.send();
      }
    catch (err) {
        return res.send(err)
    }
  }
  
  
module.exports = webReservations = {
    getAllreservations,
    deleteReservations
}