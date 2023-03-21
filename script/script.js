const api_url = "./script/product.json";
var totalPrice = 0;

window.onload = async function () {
  if (document.getElementById("productHolder")) {
    await fetch(api_url)
      .then((res) => res.json())
      .then((pro) =>
        pro.products.forEach((element) => {
          makeProductCard({
            id: element.id,
            title: element.title,
            price: element.price,
            rating: element.rating,
            images: element.images,
          });
        })
      )
      .catch((e) => console.log(e));
    hideloader();
  }
};

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
  checkQuery();
}

function checkQuery() {
  var products = Array.from(document.querySelectorAll("#productHolder .card"));
  var toCartBtn = Array.from(document.querySelectorAll("#addToCart"));
  for (var i = 0; i < products.length; i++) {
    toCartBtn[i].addEventListener("click", addToCart);
  }
}
var inCartItems = [];

function addToCart() {
  inCartItems = [
    ...inCartItems,
    {
      title: this.getAttribute("title"),
      rate: this.getAttribute("rate"),
      price: this.getAttribute("price"),
      image: this.getAttribute("imgSrc"),
    },
  ];
  console.log(inCartItems);
  localStorage.setItem("inCartItems", JSON.stringify(inCartItems));
}
function updateInCartItem() {}

function makeProductCard(
  thing = { id: 0, title: "iPhone", price: 0, rating: 0, images: [] }
) {
  var holder = document.getElementById("productHolder");
  holder.innerHTML += `<div class='card col-12 col-sm-6 col-md-4 col-lg-3 m-1 mt-5 p-2 d-flex flex-column justify-content-around productCard' id='product${thing.id}' price = ${thing.price} title = ${thing.title} rating = ${thing.rating}></div>`;
  var card = document.getElementById("product" + thing.id);
  var carouselIndicators = document.createElement("div");
  $(carouselIndicators).addClass("slide carousel");
  $(carouselIndicators)
    .attr("id", "carouselIndicators" + thing.id)
    .attr("data-ride", "carousel");
  //add carousel indicators
  var ol = document.createElement("ol");
  ol.style.listStyle = "none";
  $(ol).addClass("carousel-indicators");
  for (var i = 0; i < thing.images.length; i++) {
    var li = document.createElement("li");
    $(li)
      .attr("data-target", "#carouselIndicators" + thing.id)
      .attr("data-slide-to", i);
    if (i == 0) $(li).addClass("active");
    ol.appendChild(li);
  }
  //add carousel items
  var inner = document.createElement("div");
  $(inner).attr("role", "listbox").addClass("carousel-inner");
  for (var i = 0; i < thing.images.length; i++) {
    var itemDiv = document.createElement("div");
    $(itemDiv).addClass("carousel-item");
    if (i == 0) $(itemDiv).addClass("active");
    var itemImg = document.createElement("img");
    $(itemImg).addClass("d-block w-100");
    $(itemImg)
      .attr("src", thing.images[i])
      .attr("alt", i + " image")
      .attr("loading", "lazy")
      .attr("data-holder-rendered", "true");
    itemImg.style.width = "100%";
    itemImg.style.minHeight = "400px";
    itemDiv.appendChild(itemImg);
    inner.appendChild(itemDiv);
  }
  carouselIndicators.appendChild(ol);
  carouselIndicators.appendChild(inner);
  // add card body
  var itemBody = document.createElement("div");
  $(itemBody).addClass("card-body d-flex flex-column justify-content-around");
  var itemTitle = document.createElement("div");
  $(itemTitle).addClass("productTitle card-text");
  itemTitle.innerHTML = thing.title;
  var itemPrice = document.createElement("div");
  $(itemPrice).addClass(
    "productPrice d-flex flex-column justify-content-around"
  );
  itemPrice.innerHTML =
    'EGP<span class="text-danger" style="font-size: 1.25rem;">' +
    thing.price +
    "</span>";
  var itemLast = document.createElement("div");
  $(itemLast).addClass(
    "productLast d-flex justify-content-between align-items-baseline"
  );
  itemLast.innerHTML = `<button class="btn btn-primary addToCart" id="addToCart" productId=
    ${thing.id} price= ${thing.price} title= ${thing.title} rate= ${thing.rating} imgSrc = ${thing.images[0]}>Add To Cart</button> <div class='productRating text-secondary'> ${thing.rating} <i class="fas fa-star"></i></div>`;
  itemBody.appendChild(itemTitle);
  itemBody.appendChild(itemPrice);
  itemBody.appendChild(itemLast);
  card.appendChild(carouselIndicators);
  card.appendChild(itemBody);
}

function goToCart() {
  window.location.assign("./cart.html");
}
