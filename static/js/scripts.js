// обработка нажатия сохранения "submit". Т.к. форма динамическая (новый / изменить), то event listener добавляем здесь
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('productForm').addEventListener('submit', async (event) => {
      // наверное, чтобы добавить обработчик единожды
      event.preventDefault();
      // формирует объект с ответами из формы
      const formData = new FormData(event.currentTarget);

      const id = formData.get('id');
      const url = id ? `/products/${id}` : '/products';
      const method = id ? 'PUT' : 'POST';

      try {
        // выполнение put или post запроса (update/create)
        const req = {method,body:formData}
        const response = await fetch(url, req);
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
  
  // отображение формы в двух режимах (new / edit)
  function showForm(action, id = null) {
    // запоминаем элементы формы
    const form = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const productId = document.getElementById('productId');
    const productName = document.getElementById('productName');
    const productCategory = document.getElementById('productCategory');
    const productShortDescription = document.getElementById('productShortDescription');
    const productLongDescription = document.getElementById('productLongDescription');
    const productPrice = document.getElementById('productPrice');
  
    form.style.display = 'block';

    if (action === 'new') {
      formTitle.textContent = 'New Product';
      productId.value = '';
      productName.value = '';
      productCategory.value = '';
      productShortDescription.value = '';
      productLongDescription.value = '';
      productPrice.value = '';
      // убираем все флажки
      document.querySelectorAll('input[name="tags"]').forEach(checkbox => {
        checkbox.checked = false;
      });
      document.querySelectorAll('input[name="colors"]').forEach(checkbox => {
        checkbox.checked = false;
      });
    } else if (action === 'edit' && id) {
      formTitle.textContent = 'Edit Product';
      // сначала отправляем get-запрос на один товар
      fetch(`/products/${id}`)
        .then(response => response.json()) // ответ читаем как json
        .then(product => {
          // отображаем в форме полученные текстовые параметры
          productId.value = product.id;
          productName.value = product.name;
          productCategory.value = product.category_id;
          productShortDescription.value = product.short_description;
          productLongDescription.value = product.long_description;
          productPrice.value = product.price;
          // ставим флажки на сохраненные теги и цвета
          const tagIds = product.tags.map(tag => tag.id);
          document.querySelectorAll('input[name="tags"]').forEach(checkbox => {
            checkbox.checked = tagIds.includes(parseInt(checkbox.value));
          });
          const colorIds = product.colors.map(color => color.id);
          document.querySelectorAll('input[name="colors"]').forEach(checkbox => {
            checkbox.checked = colorIds.includes(parseInt(checkbox.value));
          });
          // отобразить связанную категорию
          productCategory.value = product.category_id;
        });
    }
  }
  // спрятать форму
  function hideForm() {
    document.getElementById('product-form').style.display = 'none';
  }
  
  // удаление товара из бд
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
  