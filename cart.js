document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const checkoutButton = document.getElementById("checkout-btn");
  const totalPriceContainer = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Функція для обчислення загальної ціни
  const calculateTotalPrice = () => {
    return cart.reduce((total, book) => total + parseFloat(book.price), 0).toFixed(2);
  };

  // Функція для рендерингу кошика
  const renderCart = () => {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Кошик порожній. Додайте книги з каталогу!</p>";
      checkoutButton.disabled = true;
      totalPriceContainer.innerHTML = "Загальна ціна: 0 грн";
    } else {
      cartContainer.innerHTML = cart.map((book, index) => `
        <div class="cart-item" data-index="${index}">
          <h3>${book.title}</h3>
          <p>Автор: ${book.author}</p>
          <p>Видавництво: ${book.product}</p>
          <p>Ціна: ${book.price} грн</p>
          <button class="remove-btn">
            <img src="images/remove-icon.png" alt="Видалити" class="remove-icon">
          </button>
        </div>
      `).join("");
      checkoutButton.disabled = false;
      totalPriceContainer.innerHTML = `Загальна ціна: ${calculateTotalPrice()} грн`;
    }
  };

  renderCart();

  // Обробник подій для кнопок видалення товарів з кошика
  cartContainer.addEventListener("click", (e) => {
    if (e.target.closest(".remove-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const index = cartItem.getAttribute("data-index");
      cart.splice(index, 1); 
      localStorage.setItem("cart", JSON.stringify(cart)); 
      renderCart(); 
    }
  });

  // Оформлення замовлення
  checkoutButton.addEventListener("click", () => {
    window.location.href = "checkout.html"; 
  });
});
