// scroll to top functionality
const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () =>
{
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// scroll to top functionality
const scrollToContact = document.querySelector("#contact");

scrollToContact.addEventListener("click", () =>
{
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
});

// send contact form to Power Automate
document.getElementById('contactForm').addEventListener('submit', function (event)
{
  event.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  fetch('https://prod-165.westeurope.logic.azure.com:443/workflows/283e43e30b88441fbf68555cf67f8399/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RnsKABVFv7dr1oTbZZxmOTpQZi7Yn2wZCptaKGOiNg8', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data =>
    {
      console.log('Success:', data);
      document.getElementById('contactForm').reset();
      let message = document.getElementById('messageSent');
      message.style.display = 'block';
      setTimeout(() => { message.style.display = 'none' }, 3000);
    })
    .catch((error) =>
    {
      console.error('Error:', error);
    });
});
