// Product data
const products = [
  {
    id: 1,
    name: "Premium Mango",
    category: "tropical",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop",
    description:
      "Sweet, juicy mangoes imported fresh from tropical regions. Perfect for smoothies or eating fresh.",
  },
  {
    id: 2,
    name: "Organic Bananas",
    category: "tropical",
    price: 2.49,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    description:
      "Creamy, naturally sweet bananas grown without pesticides. Great source of potassium and energy.",
  },
  {
    id: 3,
    name: "Fresh Pineapple",
    category: "tropical",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop",
    description:
      "Sweet and tangy pineapple with golden flesh. Rich in vitamin C and perfect for tropical dishes.",
  },
  {
    id: 4,
    name: "Valencia Oranges",
    category: "citrus",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    description:
      "Juicy, seedless oranges with bright flavor. Excellent for fresh juice or snacking.",
  },
  {
    id: 5,
    name: "Fresh Lemons",
    category: "citrus",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    description:
      "Tart and refreshing lemons perfect for cooking, baking, and making fresh lemonade.",
  },
  {
    id: 6,
    name: "Strawberries",
    category: "berries",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop",
    description:
      "Sweet, red strawberries picked at peak ripeness. Perfect for desserts and healthy snacking.",
  },
  {
    id: 7,
    name: "Blueberries",
    category: "berries",
    price: 6.49,
    image:
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop",
    description:
      "Antioxidant-rich blueberries with sweet, tangy flavor. Great for smoothies and baking.",
  },
  {
    id: 8,
    name: "Fresh Peaches",
    category: "stone-fruits",
    price: 4.49,
    image:
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop",
    description:
      "Juicy, sweet peaches with soft flesh and natural sweetness. Perfect for summer eating.",
  },
  {
    id: 9,
    name: "Sweet Cherries",
    category: "stone-fruits",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&h=300&fit=crop",
    description:
      "Dark, sweet cherries with rich flavor. A summer delicacy perfect for snacking.",
  },
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const productsGrid = document.getElementById("products-grid");
const productSearch = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const cartCount = document.getElementById("cart-count");
const cartLink = document.getElementById("cart-link");
const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  updateCartDisplay();
  renderProducts(products);
  setupEventListeners();
  setupSmoothScrolling();
}

// Event Listeners
function setupEventListeners() {
  // Hamburger menu toggle
  hamburger.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Product search
  productSearch.addEventListener("input", handleSearch);

  // Category filter
  categoryFilter.addEventListener("change", handleFilter);

  // Modal close
  document.querySelector(".close").addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      closeMobileMenu();
    }
  });
}

// Mobile menu functionality
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Scroll to section function for buttons
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Product rendering
function renderProducts(productsToRender) {
  productsGrid.innerHTML = "";

  if (productsToRender.length === 0) {
    productsGrid.innerHTML =
      '<p class="no-products">No products found matching your criteria.</p>';
    return;
  }

  productsToRender.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-category", product.category);
  card.setAttribute("data-name", product.name.toLowerCase());

  card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-buttons">
                <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
                <button class="btn btn-secondary btn-small" onclick="showProductModal(${product.id})">
                    View Details
                </button>
            </div>
        </div>
    `;

  return card;
}

// Search functionality
function handleSearch() {
  const searchTerm = productSearch.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  let filteredProducts = products;

  // Filter by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  renderProducts(filteredProducts);

  // Highlight search results
  highlightSearchResults(searchTerm);
}

// Filter functionality
function handleFilter() {
  handleSearch(); // Reuse search logic
}

// Highlight search results
function highlightSearchResults(searchTerm) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (
      searchTerm &&
      (name.includes(searchTerm) || description.includes(searchTerm))
    ) {
      card.style.border = "2px solid #4CAF50";
      card.style.boxShadow = "0 5px 20px rgba(76,175,80,0.3)";
    } else {
      card.style.border = "1px solid #f0f0f0";
      card.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    }
  });
}

// Cart functionality
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  updateCartDisplay();
  saveCartToStorage();

  // Show success feedback
  showNotification(`${product.name} added to cart!`, "success");
}

function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Add animation to cart icon
  cartLink.style.transform = "scale(1.1)";
  setTimeout(() => {
    cartLink.style.transform = "scale(1)";
  }, 200);
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Modal functionality
function showProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  modalBody.innerHTML = `
        <div class="modal-product">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
            <h2>${product.name}</h2>
            <p class="product-price" style="font-size: 1.5rem; margin: 1rem 0;">$${product.price}</p>
            <p style="margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();">
                    Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Close
                </button>
            </div>
        </div>
    `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : "#2196F3"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .no-products {
        text-align: center;
        font-size: 1.2rem;
        color: #666;
        grid-column: 1 / -1;
        padding: 2rem;
    }
`;
document.head.appendChild(style);

// Cart click handler
cartLink.addEventListener("click", function (e) {
  e.preventDefault();
  if (cart.length === 0) {
    showNotification("Your cart is empty", "info");
  } else {
    showCartModal();
  }
});

function showCartModal() {
  let cartHTML = "<h2>Shopping Cart</h2>";

  if (cart.length === 0) {
    cartHTML += "<p>Your cart is empty</p>";
  } else {
    cartHTML += '<div class="cart-items">';
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartHTML += `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #eee;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <img src="${item.image}" alt="${
        item.name
      }" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                        <div>
                            <h4>${item.name}</h4>
                            <p>$${item.price} x ${item.quantity}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: bold;">$${itemTotal.toFixed(
                          2
                        )}</span>
                        <button onclick="removeFromCart(${
                          item.id
                        })" style="background: #f44336; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 3px; cursor: pointer;">Remove</button>
                    </div>
                </div>
            `;
    });

    cartHTML += "</div>";
    cartHTML += `<div style="text-align: center; margin-top: 1rem; font-size: 1.2rem; font-weight: bold;">Total: $${total.toFixed(
      2
    )}</div>`;
    cartHTML += `<div style="text-align: center; margin-top: 1rem;">
            <button class="btn btn-primary" onclick="checkout()" style="margin-right: 1rem;">Checkout</button>
            <button class="btn btn-secondary" onclick="closeModal()">Continue Shopping</button>
        </div>`;
  }

  modalBody.innerHTML = cartHTML;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
  saveCartToStorage();
  showCartModal(); // Refresh cart modal
  showNotification("Item removed from cart", "success");
}

function checkout() {
  if (cart.length === 0) return;

  // Clear cart
  cart = [];
  updateCartDisplay();
  saveCartToStorage();

  // Close modal
  closeModal();

  // Show success message
  showNotification(
    "Thank you for your purchase! Your order has been placed.",
    "success"
  );
}

// Lazy loading for images
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize lazy loading
setupLazyLoading();
