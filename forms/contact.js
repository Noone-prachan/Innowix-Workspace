const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
 const { name, email, message } = req.body;
 const webhookUrl = 'https://discord.com/api/webhooks/1191759206630563870/38hFGPLt3grzANC5xiMba30OzC34Lt8xvDUoUBmE5lQ6OS1tvuEGE2JvqWdGHzPFDwmj';

 if (!name ||!email ||!message) {
     return res.status(400).send('Please fill in all fields');
 }

 const payload = {
     content: `**New Contact Form Submission**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
 };

 fetch(webhookUrl, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(payload)
 })
.then(response => {
     if (response.ok) {
         res.status(200).send('Message sent successfully!');
     } else {
         res.status(500).send('Failed to send message.');
     }
 })
.catch(error => {
     console.error('Error:', error);
     res.status(500).send(`Error sending message: ${error.message}`);
 });
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
