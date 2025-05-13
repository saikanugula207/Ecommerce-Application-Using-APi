let cartCount = 0;
let cartTotal = 0;

// Fetching data from the API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    let filteredProducts = products;

    // Display products in grid
    displayProducts(filteredProducts);

    // Category Filter
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        if (category === 'all') {
          filteredProducts = products;
        } else {
          filteredProducts = products.filter(product => product.category === category);
        }
        displayProducts(filteredProducts);
      });
    });
  })
  .catch(error => console.error('Error fetching products:', error));

// Function to display products
function displayProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = ''; // Clear previous products

  // Create product cards
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
    
      <div class="product-info">
        <img src="${product.image}" alt="${product.title}"> 
        <h3>${product.title.slice(0, 12)}...</h3>
        <p>${product.description.slice(0, 90)}...</p>
      </div>
      <hr>
      <div class="price-box">
        <div class="price">$${product.price.toFixed(2)}</div>
      </div>
      <hr>
      <div class="button-box">
        <button class="details-btn">Details</button>
        <button class="cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
      </div>
    
    `;
    grid.appendChild(productCard);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const price = parseFloat(e.target.dataset.price);
      cartCount++;
      cartTotal += price * 2; // Doubling the price
      document.getElementById('cart-icon').textContent = `Cart (${cartCount})`;
      addToCart(e);
    });
  });
}

// Function to handle adding items to the cart (localStorage version)
function addToCart(event) {
  const button = event.target;
  const productId = button.getAttribute("data-id");
  const productName = button.getAttribute("data-title");
  const productPrice = parseFloat(button.getAttribute("data-price"));
  const productImage = button.getAttribute("data-image");

  // Get cart from localStorage or initialize
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists in the cart
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-icon").textContent = `Cart (${cartCount})`;
}

// Initialize products
fetchProducts();
updateCartCount();


