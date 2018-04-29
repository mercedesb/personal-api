const nodemailer = require("nodemailer")

getSmtpOptions = (account) => {
  let auth

  if (account) {
    auth = {
      user: account.user,
      pass: account.pass
    }
  }
  else {
    auth = {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD
    }
  }
  return {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE === 'true',
    auth
  }
}

// should define SMTP transport here
getTransport = () => {
  let smtpTransport

  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV == 'development') {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          reject(err)
        }
        else {
          // create reusable transporter object using the default SMTP transport
          smtpTransport = nodemailer.createTransport(getSmtpOptions(account))
          resolve(smtpTransport)
        }
      })
    }
    else if (process.env.NODE_ENV == 'production') {
      smtpTransport = nodemailer.createTransport(getSmtpOptions())
      resolve(smtpTransport)
    }
  })
}

module.exports = (req, res) => {
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