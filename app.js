const form = document.querySelector('#product-form');
const productsContainer = document.querySelector('#products');
const filterCategory = document.querySelector('#filter-category');

const products = [];

function renderProducts() {
  const selectedFilter = filterCategory.value;
  const filteredProducts =
    selectedFilter === 'all'
      ? products
      : products.filter((product) => product.category === selectedFilter);

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '<p class="muted">No products found for this category.</p>';
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map(
      (product) => `
      <article class="card">
        <img src="${product.imageUrl}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="muted">Category: ${product.category}</p>
      </article>
    `,
    )
    .join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const category = form.category.value;
  const file = form.image.files[0];

  if (!name || !file) {
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  products.push({
    name,
    category,
    imageUrl,
  });

  form.reset();
  renderProducts();
});

filterCategory.addEventListener('change', renderProducts);

renderProducts();
