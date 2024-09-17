const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// API route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',  // Replace with your email provider (Gmail, Outlook, etc.)
    auth: {
      user: 'aishwariyamazumdar2000@gmail.com',     // Your email address
      pass: 'Aishwariya@22'       // Your email password
    }
  });

  // Set up the email options
  const mailOptions = {
    from: email,
    to: 'aishwariyamazumdar2000@gmail.com',  // Your receiving email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent successfully!');
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
