document.addEventListener('DOMContentLoaded', function() {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const container = document.getElementById('productsContainer');

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Calculate total stock across all variants
        const totalStock = product.variants.reduce((sum, variant) => {
          if (variant.sizes && Array.isArray(variant.sizes)) {
            return sum + variant.sizes.reduce((s, sz) => s + (Number(sz?.stock) || 0), 0);
          }
          return sum + (variant.stock || 0);
        }, 0);

        productCard.dataset.stock = totalStock;
        productCard.dataset.categories = product.categories.join(' ');

        // Create color availability HTML only if there are variants with color
        let colorDots = '';
        const hasColorVariants = product.variants.some(v => v.colorName && v.color);

        if (hasColorVariants) {
          colorDots = product.variants.map(variant => `
            <div class="color-option" 
                 data-color="${variant.colorName}"
                 data-stock="${variant.stock || 0}"
                 style="background-color: ${variant.color}">
              ${variant.stock <= 0 ? '<div class="out-of-stock-overlay"></div>' : ''}
            </div>
          `).join('');
        }

        productCard.innerHTML = `
          <a href="product-page.html?id=${product.id}" class="product-link">
            ${product.originalPrice > product.price ? `<div class="discount-badge">${((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}% OFF</div>` : ''}
            ${totalStock <= 0 ? '<div class="out-of-stock-badge">OUT OF STOCK</div>' : ''}
            <img src="image/${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
              <div class="product-title">${product.title}</div>
              <div class="product-review">
                ${product.rating} <span class="review-count">(${product.reviews} reviews)</span>
              </div>
              ${hasColorVariants ? `<div class="color-availability">${colorDots}</div>` : ''}
              <div class="product-price">
                <span class="original-price">৳${product.originalPrice.toFixed(2)}</span>
                <span class="current-price">৳${product.price.toFixed(2)}</span>
              </div>
            </div>
          </a>
        `;

        container.appendChild(productCard);
      });
      
      // Add color hover tooltip (only applies if color dots exist)

    });
});

