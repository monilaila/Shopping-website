document.addEventListener('DOMContentLoaded', function() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    window.location.href = 'index.html';
    return;
  }
  
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        document.getElementById('productPageContainer').innerHTML = `
          <div class="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <a href="index.html" class="back-to-home">Back to Home</a>
          </div>
        `;
        return;
      }
      
      renderProductPage(product);
    })
    .catch(error => {
      console.error('Error loading product:', error);
      document.getElementById('productPageContainer').innerHTML = `
        <div class="error-loading">
          <h2>Error Loading Product</h2>
          <p>There was an error loading the product details. Please try again later.</p>
          <a href="index.html" class="back-to-home">Back to Home</a>
        </div>
      `;
    });
  
  function renderProductPage(product) {
    const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
    
    const colorOptions = product.variants.map(variant => `
      <div class="variant-option ${variant.stock <= 0 ? 'out-of-stock' : ''}" 
           data-color="${variant.colorName}"
           data-stock="${variant.stock}">
        <div class="color-swatch" style="background-color: ${variant.color}"></div>
        <span class="color-name">${variant.colorName}</span>
        <span class="variant-stock">(${variant.stock <= 0 ? 'Out of stock' : `${variant.stock} available`})</span>
      </div>
    `).join('');
    
    // Create features list if features exist
    const featuresList = product.features ? `
      <div class="product-features">
        <h3>Key Features</h3>
        <ul>
          ${product.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    ` : '';
    
    const productHTML = `
      <div class="product-details">
        <div class="product-gallery">
          <div class="main-image">
            <img src="image/${product.image}" alt="${product.title}" loading="lazy">
            ${totalStock <= 0 ? '<div class="out-of-stock-badge">OUT OF STOCK</div>' : ''}
          </div>
        </div>
        
        <div class="product-info">
          <h1 class="product-title">${product.title}</h1>
          
          <div class="product-rating">
            ${product.rating} <span class="review-count">(${product.reviews} reviews)</span>
          </div>
          
          <div class="price-container">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            <span class="discount-percentage">${((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}% OFF</span>
          </div>
          
          <div class="color-selection">
            <h3>Color:</h3>
            <div class="color-options">
              ${colorOptions}
            </div>
          </div>
          
          <div class="stock-status">
            ${totalStock > 0 ? 
              `<span class="in-stock">Select a color to see specific stock</span>` : 
              '<span class="out-of-stock">Currently Out of Stock</span>'}
          </div>
          
          <div class="product-actions">
            <div class="quantity-selector">
              <button class="quantity-btn minus">-</button>
              <input type="number" value="1" min="1" max="1" class="quantity-input" disabled>
              <button class="quantity-btn plus">+</button>
            </div>
            <button class="add-to-cart-btn" disabled>
              Select a color first
            </button>
          </div>
          
          <div class="product-description">
            <h3>Description</h3>
            <p>${product.description}</p>
          </div>
          
          ${featuresList}
        </div>
      </div>
    `;
    
    document.getElementById('productPageContainer').innerHTML = productHTML;
    
    // Variables to track selected variant
    let selectedVariant = null;
    const quantityInput = document.querySelector('.quantity-input');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const stockStatus = document.querySelector('.stock-status');
    
    // Add event listeners for color selection
    document.querySelectorAll('.variant-option').forEach(option => {
      option.addEventListener('click', function() {
        if (this.classList.contains('out-of-stock')) return;
        
        // Remove active class from all options
        document.querySelectorAll('.variant-option').forEach(opt => {
          opt.classList.remove('active');
        });
        
        // Add active class to selected option
        this.classList.add('active');
        
        // Update selected variant
        selectedVariant = {
          colorName: this.dataset.color,
          stock: parseInt(this.dataset.stock)
        };
        
        // Update UI based on selected variant
        updateVariantSelection();
      });
    });
    
    function updateVariantSelection() {
      if (!selectedVariant) return;
      
      // Update stock status display
      stockStatus.innerHTML = `
        <span class="in-stock">${selectedVariant.stock} available in ${selectedVariant.colorName}</span>
      `;
      
      // Enable quantity input and set max value
      quantityInput.disabled = false;
      quantityInput.max = selectedVariant.stock;
      quantityInput.value = 1;
      
      // Update add to cart button
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'Add to Cart';
      
      // If stock is very low, show warning
      if (selectedVariant.stock <= 3) {
        stockStatus.innerHTML += `
          <span class="low-stock-warning"> (Low stock!)</span>
        `;
      }
    }
    
    // Quantity selector functionality
    document.querySelector('.quantity-btn.minus').addEventListener('click', function() {
      if (quantityInput.disabled) return;
      if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });
    
    document.querySelector('.quantity-btn.plus').addEventListener('click', function() {
      if (quantityInput.disabled) return;
      if (parseInt(quantityInput.value) < parseInt(quantityInput.max)) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      } else {
        alert(`Only ${quantityInput.max} available in stock!`);
      }
    });
    
    // Prevent manual input exceeding max stock
    quantityInput.addEventListener('change', function() {
      if (parseInt(this.value) > parseInt(this.max)) {
        this.value = this.max;
        alert(`Only ${this.max} available in stock!`);
      }
      if (parseInt(this.value) < 1) {
        this.value = 1;
      }
    });
    
    // Add to cart functionality
    addToCartBtn.addEventListener('click', function() {
      if (!selectedVariant || this.disabled) return;
      
      const quantity = parseInt(quantityInput.value);
      
      // Double check stock (in case someone manipulated the input)
      if (quantity > selectedVariant.stock) {
        alert(`Sorry, only ${selectedVariant.stock} available in ${selectedVariant.colorName}!`);
        return;
      }
      
      console.log('Added to cart:', {
        productId: product.id,
        productName: product.title,
        color: selectedVariant.colorName,
        quantity: quantity,
        price: product.price,
        maxAvailable: selectedVariant.stock
      });
      
      alert(`${quantity} ${product.title} (${selectedVariant.colorName}) added to cart!`);
      
      // Here you would normally:
      // 1. Add to cart storage
      // 2. Update cart count in header
      // 3. Maybe show a confirmation modal
    });
  }
});