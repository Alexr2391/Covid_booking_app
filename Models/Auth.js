const mongoose =  require('mongoose')

const authusersSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true, 
        unique: true, 
        required: true
    },
    password: {
        type: String,
        trim: true, 
        unique: true, 
        required: true
    }, 
    email: {
        type: String,
        trim: true, 
        unique: true, 
        required: true
    },
    temporary : {
        type: String
    }
})

module.exports = Auth = mongoose.model('auth', authusersSchema)