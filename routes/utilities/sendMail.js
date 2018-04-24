const nodemailer = require("nodemailer")

// should define SMTP transport here

module.exports = (req, res) => {
  console.log('code reached')
  if (!process.env.TO_EMAIL) {
    res.status(500).json({error: "I'm so sorry, I could not send your email at this time"})
    return
  }

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
      }
    })

    const mailOptions={
      to: process.env.TO_EMAIL,
      from: req.query.from,
      subject: req.query.subject,
      text:  req.query.text
    }

     smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error)
        res.status(500).json({error: error})
      }
      else {
        console.log("Message sent: " + response.message)
        res.status(200).json({success: true})
      }
    })
  })
}