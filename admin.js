// Get products from storage or create empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Save products to storage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Show products on page
function showProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '<h2>Existing Jerseys</h2>';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: KES ${product.price}</p>
            ${product.discount > 0 ? `<p>Discount: ${product.discount}%</p>` : ''}
            <p>${product.description}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width: 200px;">
            <button onclick="deleteProduct(${index})" style="background: #ff6347; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Handle form submission
document.getElementById('jerseyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                id: Date.now(),
                name,
                price,
                discount,
                description,
                image: e.target.result
            };

            products.push(newProduct);
            saveProducts();
            showProducts();
            this.reset();
        }.bind(this);

        reader.readAsDataURL(imageFile);
    }
});

// Delete a product
function deleteProduct(index) {
    if (confirm('Delete this jersey?')) {
        products.splice(index, 1);
        saveProducts();
        showProducts();
    }
}

// Show products when page loads
showProducts(); 
