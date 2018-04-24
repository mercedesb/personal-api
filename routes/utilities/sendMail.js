//var nodemailer = require("nodemailer");

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
// var smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//         user: "",
//         pass: ""
//     }
// });

module.exports = (req, res) => {
  res.status(200).json({ message: 'Mail Sent!' });
  // var mailOptions={
  //   to : req.query.to,
  //   subject : req.query.subject,
  //   text : req.query.text
  // }

  // console.log(mailOptions);

  // smtpTransport.sendMail(mailOptions, function(error, response){
  //   if(error){
  //     console.log(error);
  //     res.end("error");
  //   }
  //   else {
  //     console.log("Message sent: " + response.message);
  //     res.end("sent");
  //   }
  // })
}