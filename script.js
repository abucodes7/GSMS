const products = [
    { id: 1, name: "Fresh Apples", price: 2.99, image: "https://source.unsplash.com/200x200/?apple" },
    { id: 2, name: "Organic Bananas", price: 1.99, image: "https://source.unsplash.com/200x200/?banana" },
    { id: 3, name: "Carrots", price: 0.99, image: "https://source.unsplash.com/200x200/?carrot" },
    { id: 4, name: "Tomatoes", price: 1.49, image: "https://source.unsplash.com/200x200/?tomato" },
    { id: 5, name: "Potatoes", price: 0.89, image: "https://source.unsplash.com/200x200/?potato" },
    { id: 6, name: "Oranges", price: 3.49, image: "https://source.unsplash.com/200x200/?orange" },
    { id: 7, name: "Broccoli", price: 2.29, image: "https://source.unsplash.com/200x200/?broccoli" }
];

let cart = [];

function displayProducts() {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = products
        .map(
            product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
            `
        )
        .join("");
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");

    cartItems.innerHTML = cart
        .map(
            item => `
            <div class="cart-item">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
            `
        )
        .join("");

    total.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function checkout() {
    alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    cart = [];
    updateCart();
}

function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    displayProducts(products.filter(product => product.name.toLowerCase().includes(searchTerm)));
}

displayProducts();
