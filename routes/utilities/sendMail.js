const nodemailer = require("nodemailer");

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});

module.exports = (req, res) => {
  //res.status(200).json({ message: 'Mail Sent!' });
  if (!process.env.TO_EMAIL) {
    res.status(500).json({error: "I'm so sorry, I could not send your email at this time"})
    return
  }
  var mailOptions={
    to: process.env.TO_EMAIL,
    from: req.query.from,
    subject: req.query.subject,
    text  req.query.text
  }

  console.log(mailOptions)

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error)
      res.status(500).json({error: error})
    }
    else {
      console.log("Message sent: " + response.message)
      res.status(200.json({success: true}))
    }
  })
}