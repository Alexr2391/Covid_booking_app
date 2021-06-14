const nodemailer = require("nodemailer");
const ejs = require('ejs')
const { google } = require("googleapis");

const CLIENT_ID = '366120704108-5va0p0o6mkutekokluthffbpora9tb03.apps.googleusercontent.com'
const CLIENT_SECRET = 'K88tEE7G5rb68IVausughO8e'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04QVjqTApdMMgCgYIARAAGAQSNwF-L9IrWBVZkhpTBPn2u8OZiAAWPN13sB4vKF0eg8znGxhLIbIe5oZxpNMgHpETdSVFU2LjTb0'

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN
)

oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})





async function main(datas, template = '/template.ejs', cancel= false) {
    const {name, lname, email, date, store} = datas


    ejs.renderFile(
      __dirname + template, 
      {
        name :name, 
        lname: lname, 
        email : email, 
        date : date, 
        store: store}, 
        async(err, data) =>{

      try {

        const accessToken = await oAuth2Client.getAccessToken()


    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
          type: "OAuth2",
          user: "nodemailer2391@gmail.com", 
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
        // host: "smtp.gmail.com",
        // port:587, //587
        // secure: false, // true for 465, false for other ports
        // auth: {
        // },
      });


      const mailOptions = {
          from: '"Booking Decathlon" <nodemailer2391@gmail.com>', 
          to: `${email}`,
          subject: cancel || `Επιβεβαίωση Click In shop Decathlon ${store} ${date}`, 
          text: "", 
          html: data, 
      }

      const result = await transporter.sendMail(mailOptions)
      .then(console.log('message was sent'))
      .catch(err => console.log(err))
  

      return result;
    

    } 
    catch(err) {
      return err
    }
      // console.log("Message sent: %s", info.messageId);
      // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      })
    }



module.exports = Nodemailer = main;