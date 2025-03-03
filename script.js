// Sample product data
const products = [
    { id: 1, name: "Fresh Apples", price: 2.99, image: "https://source.unsplash.com/300x300/?apples" },
    { id: 2, name: "Organic Bananas", price: 1.99, image: "https://source.unsplash.com/300x300/?bananas" },
    { id: 3, name: "Carrots", price: 0.99, image: "https://source.unsplash.com/300x300/?carrots" },
    { id: 4, name: "Tomatoes", price: 1.49, image: "https://source.unsplash.com/300x300/?tomato" },
    { id: 5, name: "Potato", price: 1.29, image: "https://source.unsplash.com/300x300/?potato" },
    { id: 6, name: "Orange", price: 3.49, image: "https://source.unsplash.com/300x300/?orange" },
    { id: 7, name: "Broccoli", price: 2.19, image: "https://source.unsplash.com/300x300/?broccoli" },
    { id: 8, name: "Grapes", price: 2.99, image: "https://source.unsplash.com/300x300/?grapes" },
    { id: 9, name: "Strawberries", price: 4.99, image: "https://source.unsplash.com/300x300/?strawberries" },
    { id: 10, name: "Milk", price: 3.59, image: "https://source.unsplash.com/300x300/?milk" },
];

let cart = [
    { id: 2, name: "Organic Bananas", price: 1.99 },
    { id: 6, name: "Orange", price: 3.49 },
];

// Display products
function displayProducts() {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        animateCart();
    }
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join("");

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    total.textContent = totalPrice.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    cart = [];
    updateCart();
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

// Animate cart on add
function animateCart() {
    const cartSection = document.getElementById("cart");
    cartSection.classList.add("cart-highlight");
    setTimeout(() => cartSection.classList.remove("cart-highlight"), 500);
}

// Initialize
window.onload = function () {
    displayProducts();
    updateCart();
};
