window.onload = addCartFromStorage();

//define variables
var totalPrice = 0;

async function addCartFromStorage() {
  sorryCartDisplay();
  let products = JSON.parse(localStorage.getItem("inCartItems"));
  let productInCartDiv = document.getElementById("productInCart");
  if (products) {
    emptyCartDisplay();
    await products.forEach((product) => {
      productInCartDiv.innerHTML += `<div class="d-flex justify-content-between align-content-center bg-light rounded-sm p-1 my-2">
                <img src= ${product.image} alt= ${product.title}  class= "w-25 img-thumbnail p-1">
                <div class="d-flex flex-column justify-content-around flex-lg-grow-1 px-2">
                    <h3 class="text-primary text-md">${product.title}</h3>
                    <p>${product.rate}</p>
                    <p class="text-warning">${product.price} $</p>
                </div>
                <button class="bg-light noBorder text-md">
                    <i class="fa fa-trash text-danger"></i>
                </button>
            </div>`;
    });
    products.forEach((product) => {
      totalPrice += parseInt(product.price);
      let totalSpan = document.getElementById("totalSpan");
      totalSpan.innerHTML = totalPrice;
    });
  }
}

function confirmPayment() {
  let productInCartDiv = document.getElementById("productInCart");
  alert("thank you for buying from us :)");
  productInCartDiv.innerHTML = "";
  localStorage.removeItem("inCartItems");
  totalPrice = 0;
  sorryCartDisplay();
}

function continueShopping() {
  window.location.assign("./index.html");
}

function emptyCartDisplay() {
  let cartEmpty = document.getElementById("cartEmpty");
  let productInCartDiv = document.getElementById("productInCart");
  let paymentDetailsDiv = document.getElementById("paymentDetails");
  cartEmpty.classList.add("hidden");
  productInCartDiv.classList.remove("hidden");
  paymentDetailsDiv.classList.remove("hidden");
}
function sorryCartDisplay() {
  let cartEmpty = document.getElementById("cartEmpty");
  let productInCartDiv = document.getElementById("productInCart");
  let paymentDetailsDiv = document.getElementById("paymentDetails");
  cartEmpty.classList.remove("hidden");
  productInCartDiv.classList.add("hidden");
  paymentDetailsDiv.classList.add("hidden");
}
