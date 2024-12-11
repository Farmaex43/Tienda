const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const btnAddToCart = document.querySelectorAll('button');
const contadorProductos = document.getElementById('contador-productos');
const totalPagar = document.querySelector('.total-pagar');
const cartProductContainer = document.querySelector('.container-cart-products .cart-products');

let cart = [];
let total = 0;

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

btnAddToCart.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', '').replace(',', ''));

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        total += productPrice;
        updateCart();
    });
});

function updateCart() {
    contadorProductos.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    totalPagar.textContent = `$${total.toLocaleString()}`;

    const cartProductsHTML = cart.map((item, index) => `
        <div class="cart-product">
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${item.quantity}</span>
                <p class="titulo-producto-carrito">${item.name}</p>
                <span class="precio-producto-carrito">$${(item.price * item.quantity).toLocaleString()}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" data-index="${index}">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    `).join('');

    cartProductContainer.innerHTML = cartProductsHTML;

    const btnCloseCart = document.querySelectorAll('.icon-close');
    btnCloseCart.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const product = cart[index];
            total -= product.price;
            if (product.quantity > 1) {
                product.quantity -= 1;
                total += product.price;  // Añadir nuevamente el precio si solo se reduce una unidad
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });
    });
}
