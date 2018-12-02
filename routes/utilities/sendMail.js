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
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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

sendMail = (to, req, res) => {
  const mailOptions = {
    to: to,
    from: req.body.from,
    subject: req.body.subject,
    text: getBodyText(req)
  }
  
  for (var key in mailOptions) {
    if (mailOptions.hasOwnProperty(key) && !mailOptions[key]) {
      res.status(400).json({ error: `I'm sorry I could not send your email, missing ${key}` })
      return
    }
  }
  
  getTransport()
    .then((smtpTransport) => {
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error)
          res.status(500).json({ error: error })
        }
        else {
          if (process.env.NODE_ENV == 'development') {
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
          }
          res.status(200).json({ success: true })
        }
      })
    })
}

getBodyText = (req) => {
  let text = ''
  if (!!req.body.name) {
    text += `Name: ${req.body.name}\n`
  }

  if (!!req.body.from) {
    text += `Email: ${req.body.from}\n`
  }

  if (!!req.body.text) {
    text += req.body.text
  }

  return text
}

module.exports = {
  sendToPersonal: function (req, res) {
    if (!process.env.TO_EMAIL) {
      res.status(500).json({ error: "I'm so sorry, I could not send your email at this time" })
      return
    }
    sendMail(process.env.TO_EMAIL, req, res)
   },
  sendToMaker: function (req, res) { 
    if (!process.env.TO_MAKER_EMAIL) {
      res.status(500).json({ error: "I'm so sorry, I could not send your email at this time" })
      return
    }
    sendMail(process.env.TO_MAKER_EMAIL, req, res)
  }
}