const slides = document.querySelectorAll('.carousel-slide');
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentSlide = 0;
let isTransitioning = false;

const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

carouselContainer.appendChild(firstSlideClone);
carouselContainer.insertBefore(lastSlideClone, slides[0]);

function updateCarousel(instant = false) {
  const offset = -(currentSlide + 1) * 100;
  carouselContainer.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
  carouselContainer.style.transform = `translateX(${offset}%)`;
}

updateCarousel(true);

nextBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide++;
  updateCarousel();
  setTimeout(() => {
    if (currentSlide >= slides.length) {
      currentSlide = 0;
      updateCarousel(true);
    }
    isTransitioning = false;
  }, 500);
});

prevBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide--;
  updateCarousel();
  setTimeout(() => {
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
      updateCarousel(true);
    }
    isTransitioning = false;
  }, 500);
});

setInterval(() => {
  nextBtn.click();
}, 5000);

function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(book);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${book.title} додано до кошика!`);
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    const bookCard = event.target.closest('.book-card');
    const book = {
      title: bookCard.querySelector('h3').innerText,
      price: bookCard.querySelector('.price').innerText,
      author: bookCard.querySelector('.author').innerText,
    };
    addToCart(book);
  });
});
function showSubscriptionMessage(event) {
  event.preventDefault(); 
  const emailInput = document.getElementById("email");
  const message = document.getElementById("subscription-message");

  if (emailInput.value) {
    message.textContent = `Дякуємо за підписку, ${emailInput.value}!`;
    message.classList.remove("hidden");
    emailInput.value = ""; 
  }
}






