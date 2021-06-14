const express = require('express')
const router = express.Router()
const {getAllreservations, deleteReservations} = require('../collections/backoffice.js')

router.get('/reservation-summary', getAllreservations)
      .delete('/reservation-summary', deleteReservations)



module.exports = router