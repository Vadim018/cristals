function togglePassword() {
    var passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields!');
    } else {
        alert('Successful!');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000);
    }
}

setTimeout(function () {
    document.getElementById("loading-screen").style.opacity = 0;
    setTimeout(function () {
      document.getElementById("loading-screen").style.display = "none";
    }, 500);
  }, 0);

document.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    event.preventDefault();
    document.getElementById("loading-screen").classList.add("fade-out");
    setTimeout(function () {
      window.location.href = event.target.href;
    }, 0);
  }
});