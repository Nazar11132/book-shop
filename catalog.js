document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {

      const title = button.dataset.title;
      const author = button.dataset.author;
      const price = button.dataset.price;
      const product = button.dataset.product;
      
      const book = { title, author, price, product };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(book);

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`"${title}" додано до кошика!`);
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const bookCards = document.querySelectorAll('.book-card');

  if (!searchInput) {
    console.error('Поле для пошуку з id="search-input" не знайдено.');
    return;
  }

  if (bookCards.length === 0) {
    console.error('Картки книг з класом ".book-card" не знайдені.');
    return;
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    bookCards.forEach(card => {
      // Знайдемо назву книги та автора
      const titleElement = card.querySelector('h3:nth-of-type(1)'); // Перше <h3> - це назва
      const authorElement = card.querySelector('h3:nth-of-type(2)'); // Друге <h3> - це автор

      // Отримуємо текст з елементів, якщо вони є
      const title = titleElement ? titleElement.textContent.toLowerCase() : '';
      const author = authorElement ? authorElement.textContent.toLowerCase() : '';

      // Перевірка на співпадіння з пошуковим запитом
      if (title.includes(query) || author.includes(query)) {
        card.style.display = ''; // Показуємо картку
      } else {
        card.style.display = 'none'; // Приховуємо картку
      }
    });
  });
});









