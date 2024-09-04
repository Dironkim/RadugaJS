function showForm(action, id = null) {
    const form = document.getElementById('category-form');
    const formTitle = document.getElementById('form-title');
    const categoryId = document.getElementById('categoryId');
    const categoryName = document.getElementById('categoryName');
    const categoryDesc = document.getElementById('categoryDesc');
  
    form.style.display = 'block';
  
    if (action === 'new') {
      formTitle.textContent = 'New Category';
      categoryId.value = '';
      categoryName.value = '';
    } else if (action === 'edit' && id) {
      formTitle.textContent = 'Edit Category';
  
      fetch(`/categories/${id}`)
        .then(response => response.json())
        .then(category => {
          categoryId.value = category.id;
          categoryName.value = category.name;
          categoryDesc.value = category.description;
        });
    }
  }
  
  function hideForm() {
    const form = document.getElementById('category-form');
    form.style.display = 'none';
  }
  
  function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
      fetch(`/categories/${id}`, {
        method: 'DELETE'
      }).then(() => {
        window.location.reload();
      });
    }
  }
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('categoryForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(event.currentTarget);
      const id = formData.get('id');
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/categories/${id}` : '/categories';
    
      try {
        // выполнение put или post запроса (update/create)
        
        const req = {method,body:formData}
        const response = await fetch(url, req);
        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Failed to save category');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
})