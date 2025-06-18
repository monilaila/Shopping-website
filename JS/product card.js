document.addEventListener('DOMContentLoaded', function() {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const container = document.getElementById('productsContainer');
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Calculate total stock across all colors
        const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
        productCard.dataset.stock = totalStock;
        productCard.dataset.categories = product.categories.join(' ');
        
        // Create color availability display with stock indicators
        const colorDots = product.variants.map(variant => `
          <div class="color-option" 
               data-color="${variant.colorName}"
               data-stock="${variant.stock}"
               style="background-color: ${variant.color}">
            ${variant.stock <= 0 ? '<div class="out-of-stock-overlay"></div>' : ''}
          </div>
        `).join('');
        
        productCard.innerHTML = `
          <a href="product-page.html?id=${product.id}" class="product-link">
            <div class="discount-badge">${((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}% OFF</div>
            ${totalStock <= 0 ? '<div class="out-of-stock-badge">OUT OF STOCK</div>' : ''}
            <img src="image/${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
              <div class="product-title">${product.title}</div>
              <div class="product-review">
                ${product.rating} <span class="review-count">(${product.reviews} reviews)</span>
              </div>
              <div class="color-availability">
                ${colorDots}
              </div>
              <div class="product-price">
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                <span class="current-price"> $${product.price.toFixed(2)}</span>
              </div>
            </div>
          </a>
        `;
        
        container.appendChild(productCard);
      });
      
      // Add event listeners for color hover to show stock
      document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('mouseenter', function() {
          const stock = this.dataset.stock;
          const tooltip = document.createElement('div');
          tooltip.className = 'color-tooltip';
          tooltip.textContent = stock > 0 ? `${stock} available` : 'Out of stock';
          this.appendChild(tooltip);
        });
        
        color.addEventListener('mouseleave', function() {
          const tooltip = this.querySelector('.color-tooltip');
          if (tooltip) this.removeChild(tooltip);
        });
      });
    });
});