function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const currentLeft = sidebar.style.left;

    if (currentLeft === '0px') {
        sidebar.style.left = '-250px';
    } else {
        sidebar.style.left = '0px'; 
    }
}

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from local storage or initialize an empty array

function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item is already in the cart
        alert("Item added to Your Order's");
    } else {
        cart.push({ product, price: parseFloat(price), quantity: 1 });
        alert("Item added to Your Order's");
    }

    saveCart();
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear the cart list before rendering

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.product} - $${item.price.toFixed(2)}
            <div>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" />
            <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartList.appendChild(listItem);
    });

    updateTotalAmount();
}

function updateQuantity(index, quantity) {
    if (quantity < 1) return; // Prevent invalid quantity
    cart[index].quantity = parseInt(quantity);
    saveCart();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from the cart
    saveCart();
    renderCart();
}

function clearCart() {
    cart = []; // Empty the cart
    saveCart();
    renderCart();
}

function updateTotalAmount() {
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById("total-amount").innerText = `Total: $${totalAmount.toFixed(2)}`;
}

function payNow() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before paying.");
        return;
    }

    alert(`Thank you for your payment of $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}!`);
    clearCart(); // Clear the cart after payment
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
}

// Attach click event listeners to "Add to Cart" buttons
document.querySelectorAll(".button-food").forEach(button => {
    button.addEventListener("click", () => {
        const product = button.getAttribute("data-product");
        const price = button.getAttribute("data-price");
        addToCart(product, price);
    });
});

// Initial render of the cart on page load
renderCart();