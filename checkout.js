document.addEventListener("DOMContentLoaded", () => {
    const deliverySelect = document.getElementById("delivery");
    const novaPoshtaFields = document.getElementById("nova-poshta-fields");
    const totalPriceElement = document.getElementById("total-price");
    const cartItemsList = document.getElementById("cart-items-list");

    const productPriceElement = document.getElementById("product-price");
    const deliveryPriceElement = document.getElementById("delivery-price");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const deliveryCost = 70;
    let productTotal = cart.reduce((sum, book) => sum + Number(book.price), 0); 

    const renderCartItems = () => {
        if (cart.length === 0) {
            cartItemsList.innerHTML = "<li>Ваш кошик порожній.</li>";
        } else {
            cartItemsList.innerHTML = cart
                .map(
                    (book) => `
                    <li>
                        <strong>${book.title}</strong> - ${book.author} (${book.product}) - ${Number(book.price)} грн
                    </li>
                `
                )
                .join("");
        }
    };

    const updateTotalPrice = () => {
        const deliveryPrice = deliverySelect.value === "nova-poshta" ? deliveryCost : 0;
        productPriceElement.textContent = `${productTotal} грн`;
        deliveryPriceElement.textContent = `${deliveryPrice} грн`;
        totalPriceElement.textContent = `${productTotal + deliveryPrice} грн`; 
    };

    renderCartItems();
    updateTotalPrice();

    deliverySelect.addEventListener("change", () => {
        if (deliverySelect.value === "nova-poshta") {
            novaPoshtaFields.style.display = "block";
        } else {
            novaPoshtaFields.style.display = "none";
        }
        updateTotalPrice();
    });

    const orderForm = document.getElementById("order-form");
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Ваше замовлення оформлене!");
        localStorage.removeItem("cart"); 
        window.location.href = "index.html";
    });
});

  