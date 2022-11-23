const api_url = 'https://dummyjson.com/products?select=title,price,rating,images';
var totalPrice = 0;
(async function () {
    const res = await fetch(api_url);
    const json = await res.json()
    json.products.forEach(element => {
        makeProductCard(element.id, element.title, element.price, element.rating, element.images);
    });
    hideloader();
})();

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
    checkQuery();
}

function checkQuery(){
    var products = document.querySelectorAll("#productHolder .card");
    var toCartBtn = document.querySelectorAll("#addToCart");
    for(var i=0; i<products.length; i++){
        toCartBtn[i].addEventListener("click", function(){
    var cartDiv = document.getElementById('cart');
    var cartEmpty = document.getElementById('cartEmpty');
    //define variables
        var title = this.getAttribute('title')
        var rate = this.getAttribute('rate')
        var price = this.getAttribute('price')
    cartEmpty.style.background = 'none'; //empty the cart
    cartEmpty.innerHTML = '';
    $(cartDiv).addClass("container w-50 m-auto bg-light font-weight-bold d-flex flex-column justify-content around");
    cartDiv.style.gap = "10px"
    cartProDivTitle = document.createElement('div');
    $(cartProDivTitle).addClass("p-5 d-flex flex-column justify-content around cartItem");
    cartDiv.appendChild(cartProDivTitle);
    cartProTitle = document.createElement('h2');
    cartProTitle.innerHTML = title;
    cartProIcon = document.createElement('p');
    cartProIcon.innerHTML = "Added to cart  <i class='fas fa-certificate' style='color: #01437C'></i>";
    var cartLastDiv = document.createElement('div');
    var cartRate = document.createElement('p');
    var cartRateSpan = document.createElement('span');
    var cartPrice = document.createElement('p');
    var cartPriceSpan = document.createElement('span');
    $(cartLastDiv).addClass = 'text-center d-flex flex-column justify-content around cartItem';
    cartRate.innerHTML = "Product's Rate :";
    cartRateSpan.innerHTML = rate;
    cartPrice.innerHTML = "Product's Price :";
    cartPriceSpan.innerHTML = price;
    cartLastDiv.appendChild(cartRate);
    cartRate.appendChild(cartRateSpan);
    cartLastDiv.appendChild(cartPrice);
    cartPrice.appendChild(cartPriceSpan);

    cartProDivTitle.appendChild(cartProTitle);
    cartProDivTitle.appendChild(cartProIcon);
    cartProDivTitle.appendChild(cartLastDiv);

    if(totalPrice==0) addCartFooter(price);
    else updateCartInfo(price);
        });
    }
}
function addCartFooter(price){
    totalPrice += parseInt(price);
    var totalDiv = document.getElementById('totalPriceMainDiv');
    var totalText = document.createElement('p');
    var totalSpan = document.createElement('span');
    $(totalDiv).addClass('d-flex justify-content-between w-100')
    $(totalText).addClass('productPrice text-primary');
    $(totalSpan).addClass('text-danger');
    $(totalSpan).attr('id', 'totalSpan')
    totalText.style.textTransform = 'capitalize';
    totalText.innerHTML = "Cart Total : ";
    totalSpan.innerHTML = totalPrice;
    totalDiv.appendChild(totalText);
    totalDiv.appendChild(totalSpan);
}
function updateCartInfo(price) {
    totalPrice += parseInt(price);
    totalSpan.innerHTML = totalPrice;
}
function makeProductCard(id = 0, title = 'iPhone', price = 0, rate = 0, images = []) {
    var holder = document.getElementById('productHolder');
    holder.innerHTML += "<div class='card col-12 col-sm-6 col-md-4 col-lg-3 m-1 mt-5 p-2 d-flex flex-column justify-content-around productCard' id='product" + id + "' price='"+price+"' title='"+title+"' rate='"+rate+"'></div>";
    var card = document.getElementById('product' + id);
    var carouselIndicators = document.createElement("div");
    $(carouselIndicators).addClass("slide carousel");
    $(carouselIndicators).attr("id", "carouselIndicators" + id).attr("data-ride", "carousel");
    //add carousel indicators
    var ol = document.createElement('ol');
    ol.style.listStyle = 'none';
    $(ol).addClass("carousel-indicators");
    for (var i = 0; i < images.length; i++) {
        var li = document.createElement('li');
        $(li).attr("data-target", "#carouselIndicators" + id).attr("data-slide-to", i);
        if (i == 0)
            $(li).addClass("active");
        ol.appendChild(li);
    }
    //add carousel items
    var inner = document.createElement('div');
    $(inner).attr("role", "listbox").addClass("carousel-inner")
    for (var i = 0; i < images.length; i++) {
        var itemDiv = document.createElement('div');
        $(itemDiv).addClass("carousel-item");
        if (i == 0)
            $(itemDiv).addClass("active");
        var itemImg = document.createElement('img');
        $(itemImg).addClass("d-block w-100");
        $(itemImg).attr("src", images[i]).attr("alt", i + " image").attr("data-holder-rendered", "true");
        itemImg.style.width = "100%";
        itemImg.style.minHeight = "400px";
        itemDiv.appendChild(itemImg);
        inner.appendChild(itemDiv);
    }
    carouselIndicators.appendChild(ol);
    carouselIndicators.appendChild(inner);
    // add card body
    var itemBody = document.createElement('div');
    $(itemBody).addClass("card-body d-flex flex-column justify-content-around");
    var itemTitle = document.createElement('div');
    $(itemTitle).addClass("productTitle card-text");
    itemTitle.innerHTML = title;
    var itemPrice = document.createElement('div');
    $(itemPrice).addClass("productPrice d-flex flex-column justify-content-around");
    itemPrice.innerHTML = 'EGP<span class="text-danger" style="font-size: 1.25rem;">' + price + '</span>';
    var itemLast = document.createElement('div');
    $(itemLast).addClass("productLast d-flex justify-content-between align-items-baseline");
    itemLast.innerHTML = '<button class="btn btn-primary addToCart" id="addToCart" productId='+id+' price='+price+" title='"+title+"' rate="+rate+">Add To Cart</button> <div class='productRating text-secondary'>" + rate + '<i class="fas fa-star"></i></div>'
    itemBody.appendChild(itemTitle);
    itemBody.appendChild(itemPrice);
    itemBody.appendChild(itemLast);
    card.appendChild(carouselIndicators);
    card.appendChild(itemBody);
}

var pro=document.getElementById('productHolder');
var cartt = document.getElementById('cart')
function prductVisible(){
    console.log('prductVisible');
    pro.style.display='flex';
    cartt.style.display='none';
}
function cartVisible() {
    console.log('cartVisible');
    cartt.style.display='block';
    pro.style.display='none';
}