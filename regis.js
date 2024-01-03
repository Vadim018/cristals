function generatePassword() {
    var passwordInput = document.getElementById('password');
    var generatedPassword = generateRandomPassword(15);
    passwordInput.value = generatedPassword;
}

function generateRandomPassword(length) {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    var password = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

function togglePasswordVisibility() {
var passwordInput = document.getElementById('password');
var toggleIcon = document.getElementById('togglePassword');

if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "🔓";
} else {
    passwordInput.type = "password";
    toggleIcon.textContent = "🔒";
}
}

function validateForm() {
var nameInput = document.getElementById('name');
var addressInput = document.getElementById('address');
var phoneInput = document.getElementById('phone');
var emailInput = document.getElementById('email');
var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');

if (
    nameInput.value.length > 50 || addressInput.value.length > 50 || phoneInput.value.length > 50 ||
    emailInput.value.length > 50 || usernameInput.value.length > 50 || passwordInput.value.length > 50
) {
    alert('');
    return;
}

if (!nameInput.value || !addressInput.value || !phoneInput.value || !emailInput.value || !usernameInput.value || !passwordInput.value) {
    alert('Please fill all fields!');
    return;
}

if (!/^\d+$/.test(phoneInput.value)) {
    alert('Please enter only numbers in the phone field!');
    return;
}

if (!emailInput.value.includes('@')) {
    alert('Please enter a valid email with the @ symbol!');
    return;
}

if (passwordInput.value.length < 8) {
alert('Password must contain at least 8 characters!');
return;
}

alert('Registration is successful!');
window.location.href = 'index.html';
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