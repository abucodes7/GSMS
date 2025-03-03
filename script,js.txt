// Sample product data
const products = [
    { id: 1, name: "Fresh Apples", price: 2.99, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
    { id: 2, name: "Organic Bananas", price: 1.99, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e" },
    { id: 3, name: "Carrots", price: 0.99, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37" },
    { id: 4, name: "Tomatoes", price: 1.49, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37" },
    { id: 5, name: "Broccoli", price: 2.49, image: "https://images.unsplash.com/photo-1607083209924-76fe805d2622" },
    { id: 6, name: "Potatoes", price: 1.29, image: "https://images.unsplash.com/photo-1611926653458-fd8cf1989cbd" },
    { id: 7, name: "Oranges", price: 3.49, image: "https://images.unsplash.com/photo-1600047509233-e0db8d8d4485" }
];

let cart = [products[0], products[2], products[5]];

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

// Add to cart, update cart, and checkout functions
function addToCart(productId) { cart.push(products.find(p => p.id === productId)); updateCart(); }
function updateCart() { document.getElementById("cart-items").innerHTML = cart.map(item => `<div class="cart-item"><span>${item.name} - $${item.price.toFixed(2)}</span><button onclick="removeFromCart(${item.id})">Remove</button></div>`).join(""); }
function checkout() { alert(`Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`); cart = []; updateCart(); }

// Initialize
displayProducts();
updateCart();
