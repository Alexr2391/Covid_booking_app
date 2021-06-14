const express = require('express')
const router = express.Router()
const {getLoginRouterHandler, authenticateHandler} = require('../collections/login.js')


router.get('/', getLoginRouterHandler)
      .post('/', authenticateHandler)



module.exports = router