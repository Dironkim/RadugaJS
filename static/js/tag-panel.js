function showForm(action, id = null) {
    const form = document.getElementById('tag-form');
    const formTitle = document.getElementById('form-title');
    const tagId = document.getElementById('tagId');
    const tagName = document.getElementById('tagName');
  
    form.style.display = 'block';
  
    if (action === 'new') {
      formTitle.textContent = 'New Tag';
      tagId.value = '';
      tagName.value = '';
    } else if (action === 'edit' && id) {
      formTitle.textContent = 'Edit Tag';
  
      fetch(`/tags/${id}`)
        .then(response => response.json())
        .then(tag => {
          tagId.value = tag.id;
          tagName.value = tag.name;
        });
    }
  }
  
  function hideForm() {
    const form = document.getElementById('tag-form');
    form.style.display = 'none';
  }
  
  function deleteTag(id) {
    if (confirm('Are you sure you want to delete this tag?')) {
      fetch(`/tags/${id}`, {
        method: 'DELETE'
      }).then(() => {
        window.location.reload();
      });
    }
  }
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tagForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(event.currentTarget);
      const id = formData.get('id');
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/tags/${id}` : '/tags';
    
      try {
        // выполнение put или post запроса (update/create)
        
        const req = {method,body:formData}
        const response = await fetch(url, req);
        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Failed to save tag');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
})