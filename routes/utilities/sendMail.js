const nodemailer = require("nodemailer")

// should define SMTP transport here
getTransport = () => {
  let smtpTransport

  return new Promise(function(resolve, reject) {
    debugger

    if (process.env.NODE_ENV == 'development') {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          reject(err)
        }
        else {
          // create reusable transporter object using the default SMTP transport
          smtpTransport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
          })
          resolve(smtpTransport)
        }
      })
    }
    else if (process.env.NODE_ENV == 'production') {
      smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD
        }
      })
      resolve(smtpTransport)
    }
  })
}

module.exports = (req, res) => {
  debugger
  if (!process.env.TO_EMAIL) {
    res.status(500).json({error: "I'm so sorry, I could not send your email at this time"})
    return
  }

  const mailOptions={
    to: process.env.TO_EMAIL,
    from: req.query.from,
    subject: req.query.subject,
    text:  req.query.text
  }

  getTransport()
  .then((smtpTransport) => {
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error)
        res.status(500).json({error: error})
      }
      else {
        if (process.env.NODE_ENV == 'development') {
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
        }
        res.status(200).json({success: true})
      }
    })
  })
}