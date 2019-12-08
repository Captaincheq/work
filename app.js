const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const contact = express();

// View engine setup 
contact.engine('handlebars', exphbs());
contact.set('view engine', 'handlerbars');

//static folder
contact.use('/public', express.static(path.join(__dirname, 'public')));

contact.use(bodyParser.urlencoded({ extended: false}));
contact.use(bodyParser.json());

//Body Parser Middleware
contact.get('/', (req,res) => {
    res.render('index');
});

contact.post('/send', (req,res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Guest: ${req.body.guest}</li>
    <li>Event: ${req.body.event}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
`;


//Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.google.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'alecmabhizachirawu@gmail.com', // generated ethereal user
          pass: 'Chirawu123412' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
      // send mail with defined transport object
      let mailOptions = {
        from: '"Nodemailer Contact" <alecmabhizachirawu@gmail.com>', // sender address
        to: 'alecmabhizachirawu@gmail.com', // list of receivers
        subject: "Node contact Request", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
      
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
});
});
contact.listen(5000,() => console.log('Server started...'));