document.addEventListener("DOMContentLoaded", function () {
  const selectedProductsList = document.getElementById("selected-products-list");
  const cartBadge = document.querySelector(".badge");
  const totalCostElement = document.getElementById("total-cost");
  const deliveryCostElement = document.getElementById("delivery-cost");
  const totalCostWithDeliveryElement = document.getElementById("total-cost-with-delivery");
  const selfPickupCheckbox = document.getElementById("selfPickup");
  const deliveryCost = 55;
  const animationDuration = 500;

  function updateSelectedProducts() {
      const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
      selectedProductsList.innerHTML = "";
      const cartItemMap = new Map();
      let totalQuantity = 0;
      let totalCost = 0;

      selectedProducts.forEach((item) => {
          if (cartItemMap.has(item.name)) {
              cartItemMap.get(item.name).quantity += item.quantity;
          } else {
              cartItemMap.set(item.name, { ...item });
          }
      });

      cartItemMap.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm");
          listItem.innerHTML = `
              <div>
                  <h6 class="my-0">${item.name}</h6>
                  <p class="row-p">${item.quantity} x ${item.price} ₴</p>
              </div>
              <span class="text-body-secondary">${item.price * item.quantity} ₴</span>`;
          totalQuantity += item.quantity;
          totalCost += item.price * item.quantity;
          selectedProductsList.appendChild(listItem);
      });

      const totalCostWithDelivery = selfPickupCheckbox.checked ? totalCost : totalCost + deliveryCost;
      animatePriceChange(deliveryCostElement, parseFloat(deliveryCostElement.textContent) || 0, selfPickupCheckbox.checked ? 0 : deliveryCost);
      animatePriceChange(totalCostWithDeliveryElement, parseFloat(totalCostWithDeliveryElement.textContent) || 0, totalCostWithDelivery);
      cartBadge.textContent = totalQuantity;
      totalCostElement.textContent = totalCost.toFixed(0);
      deliveryCostElement.textContent = selfPickupCheckbox.checked ? 0 : deliveryCost;
      totalCostWithDeliveryElement.textContent = totalCostWithDelivery.toFixed(0);
      return totalQuantity;
  }

  function animatePriceChange(element, currentPrice, newPrice) {
      const priceDifference = newPrice - currentPrice;
      let startTimestamp;
      const finalProgress = 1;

      function step(timestamp) {
          if (!startTimestamp) startTimestamp = timestamp;
          const elapsed = timestamp - startTimestamp;
          const progress = Math.min(elapsed / animationDuration, finalProgress);
          const interpolatedPrice = currentPrice + priceDifference * progress;
          element.textContent = `${interpolatedPrice.toFixed(0)}`;

          if (progress < finalProgress) {
              requestAnimationFrame(step);
          }
      }

      requestAnimationFrame(step);
  }

  selfPickupCheckbox.addEventListener("change", updateSelectedProducts);
  const totalQuantity = updateSelectedProducts();

  function updateBadge() {
      const newTotalQuantity = updateSelectedProducts();

      if (newTotalQuantity !== totalQuantity) {
          totalQuantity = newTotalQuantity;
      }
  }

  document.addEventListener("cartUpdated", updateBadge);
});

document.addEventListener("DOMContentLoaded", function() {
  var cashRadio = document.getElementById("cash");
  var creditRadio = document.getElementById("credit");
  var cardFields = document.querySelector(".row.gy-3");

  function toggleCardFields() {
    if (creditRadio.checked) {
      cardFields.style.display = "flex";
    } else {
      cardFields.style.display = "none";
    }
  }
  cashRadio.addEventListener("change", toggleCardFields);
  creditRadio.addEventListener("change", toggleCardFields);
  toggleCardFields();
});

document.getElementById('phone').addEventListener('input', function (e) {
  var inputValue = e.target.value.replace(/\D/g, '');

  if (inputValue.length > 0 && inputValue.charAt(0) !== '0') {
      inputValue = '0' + inputValue.slice(0, 9);
  }

  if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
  }

  var formattedValue = inputValue.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4');
  e.target.value = formattedValue;
});

$(document).ready(function() {
  $('#cc-number').on('input', function(event) {

      if (event.originalEvent.inputType === 'deleteContentBackward') {
          return;
      }
      let cardNumber = $(this).val().replace(/\D/g, '');
      cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');

      if (cardNumber.length > 19) {
          $(this).val(cardNumber.substring(0, 19));
      } else {
          $(this).val(cardNumber);
      }
  });
});

document.getElementById('cc-expiration').addEventListener('input', function (e) {
    if (e.inputType === 'deleteContentBackward') {
        return;
    }
    let input = e.target.value.replace(/[^\d/]/g, '');
    let parts = input.split('/');

    if (parts[0] && parts[0].length > 1 && parts[0][0] === '0' && parseInt(parts[0]) > 9) {
        parts[0] = parts[0][1];
    }

    if (parts[0] === '00') {
        parts[0] = '01';
    }

    if (parts[0] && parseInt(parts[0]) > 12) {
        parts[0] = '12';
    }

    if (parts[1]) {
        parts[1] = parts[1].slice(0, 2);
    } else {
        parts[1] = '';
    }
    input = parts[0] + (parts[1] ? '/' + parts[1] : '');

    if (parts[0] && parts[0].length >= 2 && !input.includes('/')) {
        input = parts[0].slice(0, 2) + '/' + parts[1];
    }
    e.target.value = input;
});

document.getElementById('cc-cvv').addEventListener('input', function(event) {
  let inputValue = event.target.value.replace(/\D/g, '');
  inputValue = inputValue.slice(0, 3);
  event.target.value = inputValue;
});

var paymentMade = false;

function validateForm() {
  document.querySelectorAll('.is-invalid, .is-valid').forEach(element => {
    element.classList.remove('is-invalid', 'is-valid');
  });

  var selfPickupCheckbox = document.getElementById('selfPickup');
  var firstName = document.getElementById('firstName');
  var phone = document.getElementById('phone');
  var address = document.getElementById('address');
  var email = document.getElementById('email');
  var paymentMethodCash = document.getElementById('cash');
  var paymentMethodCredit = document.getElementById('credit');
  var ccNumber = document.getElementById('cc-number');
  var ccExpiration = document.getElementById('cc-expiration');
  var ccCvv = document.getElementById('cc-cvv');
  var isValid = true;

  if (!firstName.value.trim()) {
    isValid = false;
    firstName.classList.add('is-invalid');
  } else {
    firstName.classList.add('is-valid');
  }

  if (!phone.value.trim()) {
    isValid = false;
    phone.classList.add('is-invalid');
  } else {
    phone.classList.add('is-valid');
  }

  if (!email.value.trim()) {
    isValid = false;
    email.classList.add('is-invalid');
  } else {
    email.classList.add('is-valid');
  }

  if (!address.value.trim()) {
    isValid = false;
    address.classList.add('is-invalid');
  } else {
    address.classList.add('is-valid');
  }

  var isValidCreditCard = true;

  if (!selfPickupCheckbox.checked) {
    if (!paymentMethodCash.checked && !paymentMethodCredit.checked) {
      isValid = false;
      paymentMethodCash.classList.add('is-invalid');
      paymentMethodCredit.classList.add('is-invalid');
    } else {
      paymentMethodCash.classList.add('is-valid');
      paymentMethodCredit.classList.add('is-valid');
      if (paymentMethodCredit.checked) {
        isValidCreditCard = validateCreditCard();
      }
    }
  }

  if (isValid && isValidCreditCard && !paymentMade) {
    if (paymentMethodCash.checked || selfPickupCheckbox.checked) {
      alert('Order processed successfully!');
      window.location.href = 'index.html';
    } else if (paymentMethodCredit.checked) {
      ccNumber.disabled = true;
      ccExpiration.disabled = true;
      ccCvv.disabled = true;
      selfPickupCheckbox.disabled = true;
      paymentMethodCash.disabled = true;
      paymentMethodCredit.disabled = true;
      document.querySelectorAll('.not-selected').forEach(element => {
        element.disabled = true;
      });
  
      var notSelectedOption = document.getElementById('check');
      notSelectedOption.disabled = true;

      var continueBtn = document.getElementById('continueBtn');
      continueBtn.disabled = true;
  
      var mainContainer = document.getElementById('main-container');
      mainContainer.style.display = 'flex';

      var loader = document.getElementById('loader');
      loader.style.display = 'flex';

      var successIcon = document.getElementById('successIcon');
      successIcon.style.display = 'none';

      displaySuccessMessage();
      paymentMade = true;
    }
  }
}

function displaySuccessMessage() {
  setTimeout(function () {
    loader.style.display = 'none';

    successIcon.style.display = 'flex';

    var payP = document.querySelector('.pay-p');
    payP.style.display = 'flex';

    var okButton = document.getElementById('okButton');
    okButton.style.display = 'block';

    okButton.addEventListener('click', function () {
      window.location.href = 'index.html';
    });

    var continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = true;
    paymentMade = true;

  }, 5000);
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

function validateCreditCard() {
  document.getElementById('cc-number-error').style.display = 'none';
  document.getElementById('cc-expiration-error').style.display = 'none';
  document.getElementById('cc-cvv-error').style.display = 'none';
  document.getElementById('cc-number-success').style.display = 'none';
  document.getElementById('cc-expiration-success').style.display = 'none';
  document.getElementById('cc-cvv-success').style.display = 'none';

  var ccNumber = document.getElementById('cc-number').value.replace(/\s/g, '');
  var ccExpiration = document.getElementById('cc-expiration').value;
  var ccCvv = document.getElementById('cc-cvv').value;

  if (!/^\d{16}$/.test(ccNumber)) {
    document.getElementById('cc-number-error').style.display = 'block';
    document.getElementById('cc-number').classList.add('is-invalid');
    return false;
  } else {
    document.getElementById('cc-number').classList.remove('is-invalid');
    document.getElementById('cc-number-success').style.display = 'block';
  }

  if (!/^\d{2}\/\d{2}$/.test(ccExpiration)) {
    document.getElementById('cc-expiration-error').style.display = 'block';
    document.getElementById('cc-expiration').classList.add('is-invalid');
    return false;
  } else {
    document.getElementById('cc-expiration').classList.remove('is-invalid');
    document.getElementById('cc-expiration-success').style.display = 'block';
  }

  if (!/^\d{3}$/.test(ccCvv)) {
    document.getElementById('cc-cvv-error').style.display = 'block';
    document.getElementById('cc-cvv').classList.add('is-invalid');
    return false;
  } else {
    document.getElementById('cc-cvv').classList.remove('is-invalid');
    document.getElementById('cc-cvv-success').style.display = 'block';
  }

  return true;
}

var firstName = document.getElementById('firstName');
firstName.addEventListener('input', function () {
  firstName.classList.remove('is-invalid', 'is-valid');
  if (!firstName.value.trim()) {
    firstName.classList.add('is-invalid');
  } else {
    firstName.classList.add('is-valid');
  }
});

var phone = document.getElementById('phone');
phone.addEventListener('input', function () {
  phone.classList.remove('is-invalid', 'is-valid');
  if (!phone.value.trim()) {
    phone.classList.add('is-invalid');
  } else {
    phone.classList.add('is-valid');
  }
});

var email = document.getElementById('email');
email.addEventListener('input', function () {
  email.classList.remove('is-invalid', 'is-valid');
  if (!email.value.trim()) {
    email.classList.add('is-invalid');
  } else {
    email.classList.add('is-valid');
  }
});

var address = document.getElementById('address');
address.addEventListener('input', function () {
  address.classList.remove('is-invalid', 'is-valid');
  if (!address.value.trim()) {
    address.classList.add('is-invalid');
  } else {
    address.classList.add('is-valid');
  }
});

function updateDeliveryCost() {
  var selfPickupCheckbox = document.getElementById('selfPickup');
  var continueBtn = document.getElementById('continueBtn');
  var paymentMethodRadios = document.getElementsByName('paymentMethod');
  var notificationContainer = document.getElementById('notificationContainer');

  if (selfPickupCheckbox.checked) {
      for (var i = 0; i < paymentMethodRadios.length; i++) {
          paymentMethodRadios[i].disabled = true;
      }
      notificationContainer.innerHTML = `
      <div class="alert alert-info" role="alert">
        If you chose this item, you can ignore the payment method, since self-delivery
        is carried out from our restaurant and there you can already pay in any convenient way for you!
      </div>`;
  } else {
      for (var i = 0; i < paymentMethodRadios.length; i++) {
          paymentMethodRadios[i].disabled = false;
      }
      notificationContainer.innerHTML = '';
  }
}

function submitComment() {
  const commentContent = document.getElementById('orderComment').value.trim();

  if (commentContent.length === 0) {
    alert('Please enter your comment!');
    return;
  }

  const currentTime = new Date().toLocaleTimeString();
  const commentSection = document.getElementById('commentsSection');
  const commentHtml = `<p><strong>${currentTime}:</strong> ${commentContent}</p>`;
  commentSection.innerHTML += commentHtml;
  document.getElementById('orderComment').value = '';
}

function enableContinueButton() {
  var notSelectedRadio = document.getElementById("check");
  var selfPickupCheckbox = document.getElementById("selfPickup");

  if (notSelectedRadio.checked) {
      selfPickupCheckbox.disabled = false;
  } else {
      selfPickupCheckbox.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  enableContinueButton();

  var cashRadio = document.getElementById("cash");
  var creditRadio = document.getElementById("credit");
  var notSelectedRadio = document.getElementById("check");

  cashRadio.addEventListener("change", enableContinueButton);
  creditRadio.addEventListener("change", enableContinueButton);
  notSelectedRadio.addEventListener("change", enableContinueButton);
});

function togglePaymentOptionsVisibility() {
  var selfPickupCheckbox = document.getElementById('selfPickup');
  var paymentMethodCash = document.getElementById('cash');
  var paymentMethodCredit = document.getElementById('credit');
  var notSelectedRadio = document.getElementById('check');
  var firstName = document.getElementById('firstName');
  var phone = document.getElementById('phone');
  var address = document.getElementById('address');
  var email = document.getElementById('email');
  var pay = document.getElementById('pay');
  var hr = document.getElementById('hr');
  var isUserDetailsEntered = firstName.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    address.value.trim() !== '' &&
    email.value.trim() !== '';
  
  if (isUserDetailsEntered) {
    paymentMethodCash.parentElement.style.display = 'block';
    paymentMethodCredit.parentElement.style.display = 'block';
    notSelectedRadio.parentElement.style.display = 'block';
    selfPickupCheckbox.parentElement.style.display = 'block';
    pay.style.display = 'block';
    hr.style.display = 'block';
  } else {
    paymentMethodCash.parentElement.style.display = 'none';
    paymentMethodCredit.parentElement.style.display = 'none';
    notSelectedRadio.parentElement.style.display = 'none';
    selfPickupCheckbox.parentElement.style.display = 'none';
    pay.style.display = 'none';
    hr.style.display = 'none';
  }
}

var inputFields = document.querySelectorAll('#firstName, #phone, #address, #email');
inputFields.forEach(function (inputField) {
  inputField.addEventListener('input', togglePaymentOptionsVisibility);
});

togglePaymentOptionsVisibility();

document.getElementById('toggle-cvv').addEventListener('click', function () {
  var cvvInput = document.getElementById('cc-cvv');
  var cvvIcon = document.getElementById('cvv-icon');

  if (cvvInput.type === 'password') {
      cvvInput.type = 'text';
      cvvIcon.textContent = '👀';
  } else {
      cvvInput.type = 'password';
      cvvIcon.textContent = '👁️';
  }
});