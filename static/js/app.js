// Initialize shopping cart
var cart = [];

// Handle "Add to Cart" button click event
$(".add-to-cart").click(function() {
    var name = $(this).data("name");
    var price = $(this).data("price");
    addToCart(name, price);
});

// Add item to cart and display confirmation message
function addToCart(name, price) {
    // Add selected item to cart
    cart.push({
        name: name,
        price: price
    });

    // Display confirmation message
    Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: name + ' has been added to your shopping cart.',
        confirmButtonText: 'View Cart'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to cart page
            window.location.href = "/cart";
        }
    });
}

// Save shopping cart to local storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load shopping cart from local storage
function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart") || "[]");
}

// Update cart count in navigation bar
function updateCartCount() {
    var count = cart.length;
    $("#cart-count").text(count);
}

// Display cart items on cart page
function displayCartItems() {
    var cartItems = "";
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        cartItems += "<tr>";
        cartItems += "<td>" + cart[i].name + "</td>";
        cartItems += "<td>$" + cart[i].price + "</td>";
        cartItems += "</tr>";
        total += cart[i].price;
    }
    $("#cart-items").html(cartItems);
    $("#cart-total").html("$" + total);
}

// Remove item from cart and display updated cart
function removeCartItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
    updateCartCount();
}

// Handle "Remove" button click event on cart page
$("#cart-items").on("click", ".remove-item", function() {
    var index = $(this).data("index");
    removeCartItem(index);
});

// Handle "Checkout" button click event on cart page
$("#checkout-btn").click(function() {
    // Clear shopping cart
    cart = [];
    saveCart();
    displayCartItems();
    updateCartCount();

    // Display success message
    Swal.fire({
        icon: 'success',
        title: 'Order Complete!',
        text: 'Thank you for your purchase.',
        confirmButtonText: 'Continue Shopping'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to home page
            window.location.href = "/";
        }
    });
});

// Load shopping cart on page load
$(document).ready(function() {
    loadCart();
    updateCartCount();
    if (window.location.href.indexOf("cart.html") > -1) {
        displayCartItems();
    }
});

function checkout() {
  // Redirect the user to the checkout page and pass the shopping cart and total price as URL parameters
  var url = 'checkout.html?cart=' + encodeURIComponent(JSON.stringify(shoppingCart)) + '&total=' + total;
  window.location.href = url;
}

// Get the shopping cart and total price from the URL parameters
var urlParams = new URLSearchParams(window.location.search);
var cart = JSON.parse(decodeURIComponent(urlParams.get('cart')));
var total = urlParams.get('total');

// Display the order summary section
var orderSummary = document.getElementById('order-summary');
for (var i = 0; i < cart.length; i++) {
  var item = cart[i];
  var li = document.createElement('li');
  li.textContent = item.name + ' - $' + item.price;
  orderSummary.appendChild(li);
}
var totalEl = document.getElementById('total');
totalEl.textContent = '$' + total;
