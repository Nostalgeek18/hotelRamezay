const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const emailSender = async (req, res) => {
    console.log('main function triggered');

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <choco18@live.ca>', // sender address
        to: "mouzai.n@yahoo.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).send('Email sent');
};

// Add a route for the root URL
app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
});

app.post('/send-email', emailSender);

app.listen(5001, () => {
    console.log('Server started on http://localhost:5000');
});
