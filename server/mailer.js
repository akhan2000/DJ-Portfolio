// const aws = require('aws-sdk');
// const ses = new aws.SES({ region: 'us-west-2' }); 

// function sendMail({ name, email, date, time, message }) {
//   const params = {
//     Destination: {
//       ToAddresses: ['asfandyar.khan@duke.edu'] // Replace with your desired recipient email address(es)
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: `
//             Name: ${name}
//             Email: ${email}
//             Date: ${date}
//             Time: ${time}
//             Message: ${message}
//           `
//         }
//       },
//       Subject: {
//         Data: 'New Booking Inquiry'
//       }
//     },
//     Source: 'asfandyarkhan17@hotmail.com' // Replace with your verified sender email address
//   };

//   ses.sendEmail(params, (error, data) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', data);
//     }
//   });
// }

// module.exports = { sendMail };
