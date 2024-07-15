document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('productForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const id = formData.get('id');
      const url = id ? `/products/${id}` : '/products';
      const method = id ? 'PUT' : 'POST';
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        const req = {method,body:formData,}
        console.log(req.body); 
        const response = await fetch(url, req
        );
        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Failed to save product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  
  function showForm(action, id = null) {
    const form = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const productId = document.getElementById('productId');
    const productName = document.getElementById('productName');
    const productCategory = document.getElementById('productCategory');
    const productShortDescription = document.getElementById('productShortDescription');
    const productLongDescription = document.getElementById('productLongDescription');
    const productColor = document.getElementById('productColor');
    const productPrice = document.getElementById('productPrice');
  
    form.style.display = 'block';
    if (action === 'new') {
      formTitle.textContent = 'New Product';
      productId.value = '';
      productName.value = '';
      productCategory.value = '';
      productShortDescription.value = '';
      productLongDescription.value = '';
      productColor.value = '';
      productPrice.value = '';
    } else if (action === 'edit' && id) {
      formTitle.textContent = 'Edit Product';
      fetch(`/products/${id}`)
        .then(response => response.json())
        .then(product => {
          productId.value = product.id;
          productName.value = product.name;
          productCategory.value = product.category_id;
          productShortDescription.value = product.short_description;
          productLongDescription.value = product.long_description;
          productColor.value = product.color;
          productPrice.value = product.price;
        });
    }
  }
  
  function hideForm() {
    document.getElementById('product-form').style.display = 'none';
  }
  
  async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  