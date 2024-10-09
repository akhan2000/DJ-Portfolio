require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { SES } = require('aws-sdk');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/send', async (req, res) => {
  const { name, email, date, time, message } = req.body;

  const ses = new SES({ region: 'us-east-1' });

  const params = {
    Source: 'asfandyarkhann2000@gmail.com', // Replace with your verified sender email address
    Destination: {
      ToAddresses: ['asfandyar.khan@duke.edu', 'ak556@duke.edu'] // Replace with your desired recipient email address(es)
    },
    Message: {
      Subject: {
        Data: `New Message From ${name} - Event Date: ${date} - Event Time: ${time}`
      },
      Body: {
        Text: {
          Data: message
        }
      }
    }
  };

  try {
    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
      .then((result) => {
        console.log('Email sent:', result);
        res.status(200).json({ message: 'Message sent successfully' }); // Return JSON response
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email.' }); // Return JSON response
      });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email.' }); // Return JSON response
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
