window.onload = addCartFromStorage();

//define variables
var totalPrice = 0;

async function addCartFromStorage() {
  let products = JSON.parse(localStorage.getItem("inCartItems"));
  let productInCartDiv = document.getElementById("productInCart");
  if (products && products != false) {
    emptyCartDisplay();
    productInCartDiv.innerHTML = "";
    await products.forEach((product) => {
      productInCartDiv.innerHTML += `<div class="d-flex justify-content-between align-content-center bg-light rounded-sm p-1 my-2">
                <img src= ${product.image} alt= ${
        product.title
      }  class= "w-25 img-thumbnail p-1">
                <div class="d-flex flex-column justify-content-around flex-lg-grow-1 px-2">
                    <h3 class="text-primary text-md">${product.title}</h3>
                    <p>${product.rate}</p>
                    <p class="text-warning">${product.price} $</p>
                </div>
                <button name="${
                  product.title + product.rate
                }" class="bg-light p-2 d-block noBorder text-md">
                    <i class="fa fa-trash text-danger"></i>
                </button>
            </div>`;
    });
    let btns = Array.from(document.querySelectorAll("button[name]"));
    btns.forEach((btn) => btn.addEventListener("click", removeProductFromList));
    products.forEach((product) => {
      totalPrice += parseInt(product.price);
      let totalSpan = document.getElementById("totalSpan");
      totalSpan.innerHTML = totalPrice;
    });
  } else {
    sorryCartDisplay();
  }
  updatePrice();
}
function updatePrice() {
  let products = JSON.parse(localStorage.getItem("inCartItems"));
  totalPrice = 0;
  products.forEach((product) => {
    totalPrice += parseInt(product.price);
    let totalSpan = document.getElementById("totalSpan");
    totalSpan.innerHTML = totalPrice;
  });
}
function removeProductFromList() {
  let products = JSON.parse(localStorage.getItem("inCartItems"));
  let index = products.map((e) => e.title + e.rate).indexOf(this.name);
  products.splice(index, 1);
  localStorage.setItem("inCartItems", JSON.stringify(products));
  this.removeEventListener("click", removeProductFromList);
  addCartFromStorage();
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
