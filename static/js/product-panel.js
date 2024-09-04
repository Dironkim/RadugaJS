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

      const imageElements = document.querySelectorAll('.image-preview img');
      imageElements.forEach((image, index) => {
        if (image.dataset.saved === "true") {
          formData.append('existing_images', image.src);
        }
      });
      try {
        // выполнение put или post запроса (update/create)
        
        const req = {method,body:formData}
        console.log(req.body)
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
    updateCarouselButtons();
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
    const imagePreviewRow = document.querySelector('.image-preview-row');
    
  
    form.style.display = 'block';
    imagePreviewRow.innerHTML = '';

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

          // Отображаем связанные изображения
          product.images.forEach(image => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('image-preview');
            imageElement.innerHTML = `
              <img src="${image.image_url}" alt="Product Image" data-saved="true">
              <button type="button" class="remove-button" onclick="removeImage(this)">x</button>
            `;
            imagePreviewRow.appendChild(imageElement);
          });
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

  function prevImage(productId) {
    const carouselInner = document.getElementById(`carousel-${productId}`);
    const activeImage = carouselInner.querySelector('.active');
    const prevImage = activeImage.previousElementSibling || carouselInner.lastElementChild;
    if (prevImage) {
    activeImage.classList.remove('active');
    prevImage.classList.add('active');
    updateCarouselButtons(productId);
  }
  }
  
  function nextImage(productId) {
    const carouselInner = document.getElementById(`carousel-${productId}`);
    const activeImage = carouselInner.querySelector('.active');
    const nextImage = activeImage.nextElementSibling || carouselInner.firstElementChild;
    if (nextImage) {
      activeImage.classList.remove('active');
      nextImage.classList.add('active');
      updateCarouselButtons(productId);
    }
  }
  function updateCarouselButtons() {
    document.querySelectorAll('.carousel-inner').forEach(carouselInner => {
      const productId = carouselInner.id.match(/\d+/)[0];
      const prevButton = document.querySelector(`button[onclick="prevImage(${productId})"]`);
      const nextButton = document.querySelector(`button[onclick="nextImage(${productId})"]`);
      const activeImage = carouselInner.querySelector('.active');
  
      if (!activeImage.previousElementSibling) {
        prevButton.setAttribute('disabled', 'disabled');
      } else {
        prevButton.removeAttribute('disabled');
      }
  
      if (!activeImage.nextElementSibling) {
        nextButton.setAttribute('disabled', 'disabled');
      } else {
        nextButton.removeAttribute('disabled');
      }
    });
  }


  function addNewImages() {
    const files = document.getElementById('newImages').files;
    const imagePreviewRow = document.querySelector('.image-preview-row');
    if (files) {
      Array.from(files).forEach((file, index)=> {
        const img_src = URL.createObjectURL(file);
        const imageElement = document.createElement('div');
        imageElement.classList.add('image-preview');
        // приписываем элементу индекс загруженного файла
        imageElement.dataset.fileIndex = index;
        imageElement.innerHTML = `
          <img src="${img_src}" alt="Product Image">
          <button type="button" class="remove-button" onclick="removeImage(this)">x</button>
        `;
        imagePreviewRow.appendChild(imageElement);
      });
    }  
  }
  
  function removeImage(button) {
    // получаем html-элемент (превью), который удаляем
    const imageElement = button.closest('.image-preview');
    // проверяем, новый это или уже сохраненный
    const isSaved = imageElement.querySelector('img').dataset.saved === "true";
  
    if (!isSaved) {
      // Для новых изображений также удаляем из input
      const fileIndex = imageElement.dataset.fileIndex;
      const newImagesInput = document.getElementById('newImages');
      const dt = new DataTransfer();
  
      Array.from(newImagesInput.files).forEach((file, index) => {
        if (index != fileIndex) {
          dt.items.add(file); // Добавляем все файлы, кроме удаленного
        }
      });
  
      newImagesInput.files = dt.files; // Обновляем input files
      
    }
    imageElement.remove();
  }
