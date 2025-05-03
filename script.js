// scroll to top functionality
const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// scroll to top functionality
const scrollToContact = document.querySelector("#contact");

scrollToContact.addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
});

const sendMessage = (message, messageText) => {
  message.style.display = "block";
  message.innerText = messageText;
};

// send contact form to Power Automate using XHR
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    const message = document.getElementById("messageSent");

    sendMessage(message, "Sending form...");

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://prod-165.westeurope.logic.azure.com:443/workflows/283e43e30b88441fbf68555cf67f8399/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RnsKABVFv7dr1oTbZZxmOTpQZi7Yn2wZCptaKGOiNg8"
    );
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log("Success:", response);
          sendMessage(message, "Form sent");
          document.getElementById("contactForm").reset();
          setTimeout(() => {
            message.style.display = "none";
          }, 1000);
        } else {
          console.error("Error:", xhr.statusText);
        }
      }
    };

    xhr.send(JSON.stringify(data));
  });
