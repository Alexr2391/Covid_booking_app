const Connection = require('./db-connect.js')
const Auth = require('../Models/Auth.js')
const bcrypt = require('bcryptjs')

//---------- MONGO CONNECT -------------------------------

Connection()

// -------------------------------------------------------


async function getLoginRouterHandler(req, res) {

    if(req.session.isLoggedIn) {
        return res.status(302).redirect('/web/reservation-summary')
    }
     
   return res.render('login')
}

async function authenticateHandler(req, res) {
    const {username, password} = req.body

    const findUser = await Auth.findOne({userName: username}).exec()

    if(!findUser) {
        return res.json({
            isValid: false,
            error: 'Username or password is not valid'
        })
    }

    const comparePw = await bcrypt.compare(password, findUser.password)

    if(!comparePw) {
        return res.json({
            isValid: false,
            error: 'Username or password is not valid'
        })
    }

    req.session.isLoggedIn = true
    
    return res.json({
        isValid: true,
        success: `succesfully logged in`
    })
}

module.exports = loginRoutes = {
    getLoginRouterHandler,
    authenticateHandler
}