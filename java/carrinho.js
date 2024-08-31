document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartElement = document.getElementById('cart');
    const itemCountElement = document.getElementById('item-count');
    const totalElement = document.getElementById('total');
    const cartItemsElement = document.querySelector('.cart-items');
    const openCartButton = document.getElementById('open-cart');
    const closeCartButton = document.getElementById('close-cart');

    // Função para adicionar item ao carrinho
    function addToCart(product) {
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);

        // Verificar se o item já está no carrinho
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    // Função para atualizar o carrinho
    function updateCart() {
        itemCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        totalElement.textContent = total;

        cartItemsElement.innerHTML = ''; // Limpa o carrinho
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.name}</span>
                <span>Quantidade: ${item.quantity}</span>
                <span>Preço: R$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsElement.appendChild(cartItemElement);
        });
    }

    // Mostrar carrinho
    openCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        cartElement.style.display = 'block';
    });

    // Fechar carrinho
    closeCartButton.addEventListener('click', () => {
        cartElement.style.display = 'none';
    });

    // Adicionar event listeners aos botões "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            if (product) {
                addToCart(product);
            } else {
                console.error("Produto não encontrado");
            }
        });
    });
});
