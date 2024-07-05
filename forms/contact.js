// Contact form submission handler
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Basic form validation
  if (!name || !email || !subject || !message) {
    Swal.fire('Error!', 'Please fill in all the fields!', 'error');
    return;
  }

  // More robust email validation
  if (!validateEmail(email)) {
    Swal.fire('Error!', 'Invalid email address!', 'error');
    return;
  }

  // Use a more secure approach to send emails
  const emailConfig = {
    // Replace with your email service provider's API or a secure token
    SecureToken: "C973D7AD-F097-4B95-91F4-40ABC5567812",
    Username: 'prachansubedi4@gmail.com',
    Password: 'D87413A3BA315888BC4CEEC85B05461AE0AC',
    To: 'prachansubedi4@gmail.com',
    From: email,
    Subject: subject,
    Body: message,
  };

  sendEmail(emailConfig)
    .then(() => {
      console.log('Email sent successfully!');
      Swal.fire('Success!', 'Your message has been sent!', 'success');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      Swal.fire('Error!', 'Failed to send your message!', 'error');
    });
});

// More robust email validation function
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Send email function
function sendEmail(emailConfig) {
  // Replace with your email service provider's API or a custom implementation
  return Email.send(emailConfig);
}