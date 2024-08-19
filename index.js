const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");
const attachment = document.getElementById("attachment");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}
    <br> Email: ${email.value}<br> Message: ${mess.value}`;

  const file = attachment.files[0]; // Get the first file selected

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      Email.send({
        SecureToken: "19d2994e-f374-435e-b116-8931346c8ca2",
        Host: "smtp.elasticemail.com",
        Username: "youssef.fares89@gmail.com",
        Password: "C4A1FB5ECDB3EDC6F717A8D8A62A60A00C7E",
        To: "youssef.fares89@gmail.com",
        From: "youssef.fares89@gmail.com",
        Subject: subject.value,
        Body: bodyMessage,
        Attachments: [
          {
            name: file.name,
            data: e.target.result.split("base64,")[1], // Attach the base64 data
          },
        ],
      }).then((message) => {
        if (message == "OK") {
          Swal.fire({
            icon: "success",
            iconColor: "rgb(187, 165, 61)",
            title: "Your message has been sent",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
    };

    reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded)
  } else {
    // Send the email without attachment if no file is selected
    Email.send({
      SecureToken: "19d2994e-f374-435e-b116-8931346c8ca2",
      Host: "smtp.elasticemail.com",
      Username: "youssef.fares89@gmail.com",
      Password: "C4A1FB5ECDB3EDC6F717A8D8A62A60A00C7E",
      To: "youssef.fares89@gmail.com",
      From: "youssef.fares89@gmail.com",
      Subject: subject.value,
      Body: bodyMessage,
    }).then((message) => {
      if (message == "OK") {
        Swal.fire({
          icon: "success",
          iconColor: "rgb(187, 165, 61)",
          title: "Your message has been sent",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address:";
    } else {
      errorTxtEmail.innerText = "Please enter your email address:";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !mess.classList.contains("error")
  ) {
    sendEmail();

    setTimeout(function () {
      form.reset();
    }, 2900);
    return false;
  }
});
