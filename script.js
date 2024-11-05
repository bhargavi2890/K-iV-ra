document.addEventListener('DOMContentLoaded', function () {
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartModal = document.getElementById('cart-modal');
    const ordersModal = document.getElementById('orders-modal');
    const closeCart = document.getElementById('close-cart');
    const closeOrders = document.getElementById('close-orders');
    const modalOverlay = document.getElementById('modal-overlay');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartBtn = document.getElementById('cart-btn');
    const ordersBtn = document.getElementById('orders-btn'); // Correct button ID
    const ordersItems = document.getElementById('order-items');

    let previousOrders = [
        { name: "Product 1", price: 450.00, quantity: 2, date: "2024-10-01" },
        { name: "Product 2", price: 300.00, quantity: 1, date: "2024-10-05" },
        { name: "Product 3", price: 2500.00, quantity: 1, date: "2024-10-10" }
    ];

    // Event Listeners for opening modals
    cartBtn?.addEventListener('click', () => {
        updateCartItems();
        toggleModal(cartModal, true);
    });

    ordersBtn?.addEventListener('click', () => {
        updateOrderItems();
        toggleModal(ordersModal, true);  // Correct modal handling
    });

    // Close modals on button or overlay click
    closeCart?.addEventListener('click', () => toggleModal(cartModal, false));
    closeOrders?.addEventListener('click', () => toggleModal(ordersModal, false));
    modalOverlay?.addEventListener('click', () => {
        toggleModal(cartModal, false);
        toggleModal(ordersModal, false);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            if (!name || isNaN(price)) {
                showMessage('Invalid product data.');
                return;
            }

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
                showMessage(`${name} quantity updated.`);
            } else {
                cart.push({ name, price, quantity: 1 });
                showMessage(`${name} added to cart.`);
            }

            updateCartCount();
        });
    });

    checkoutBtn?.addEventListener('click', () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (total > 0) {
            generateQr(total);
        } else {
            alert('Your cart is empty!');
        }
    });

    // Function to update cart count
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Function to update cart items
    function updateCartItems() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItems.innerHTML += `
                <li>
                    ${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </li>`;
        });

        cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
        attachRemoveItemListeners();
    }

    // Function to attach remove item listeners
    function attachRemoveItemListeners() {
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    // Function to update order items
    function updateOrderItems() {
        ordersItems.innerHTML = '';  // Clear previous list

        previousOrders.forEach(order => {
            ordersItems.innerHTML += `
                <li>
                    ${order.name} - ₹${order.price.toFixed(2)} x ${order.quantity} (Ordered on: ${order.date})
                </li>`;
        });
    }

    // Function to remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartItems();
        updateCartCount();
        showMessage('Item removed from cart.');
    }

    // Function to toggle modals
    function toggleModal(modal, show) {
        modal.classList.toggle('active', show);
        modalOverlay.classList.toggle('active', show);
    }

    // Function to generate QR code
    function generateQr(amount) {
        const qrcodeContainer = document.querySelector('.qrcode');
        qrcodeContainer.innerHTML = '';  // Clear previous QR code

        const upiID = 'your-upi-id@bank';
        const name = 'Your Name';
        const transactionRefID = 'TXN123456789';
        const note = 'Payment for groceries';

        const upiUrl = `upi://pay?pa=${upiID}&pn=${name}&tr=${transactionRefID}&tn=${note}&am=${amount}&cu=INR`;

        let qrcode = new QRCode(qrcodeContainer);
        qrcode.makeCode(upiUrl);

        window.location.href = `paytm://pay?pa=${upiID}&pn=${name}&tr=${transactionRefID}&tn=${note}&am=${amount}&cu=INR`;
    }

    // Function to show messages
    function showMessage(message) {
        alert(message);
    }
});

