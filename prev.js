document.addEventListener("DOMContentLoaded", function () {
    const ordersBtn = document.getElementById("orders-btn");
    const ordersModal = document.getElementById("orders-modal");
    const closeOrders = document.getElementById("close-orders");
    const modalOverlay = document.getElementById("modal-overlay");
    const orderItems = document.getElementById("order-items");

    // Sample Previous Orders Data
    const previousOrders = [
        { name: "Product 1", price: 450.00, quantity: 2, date: "2024-10-01" },
        { name: "Product 2", price: 300.00, quantity: 1, date: "2024-10-05" },
        { name: "Product 3", price: 2500.00, quantity: 1, date: "2024-10-10" }
    ];

    // Function to toggle modal visibility
    function toggleModal(modal, show) {
        modal.classList.toggle("active", show);
        modalOverlay.classList.toggle("active", show);
    }

    // Event listener to open Previous Orders Modal
    ordersBtn.addEventListener("click", function () {
        console.log("Orders button clicked");  // Debugging
        updateOrderItems();
        toggleModal(ordersModal, true);
    });

    // Event listener to close Previous Orders Modal
    closeOrders.addEventListener("click", () => toggleModal(ordersModal, false));
    modalOverlay.addEventListener("click", () => toggleModal(ordersModal, false));

    // Function to update order items inside the modal
    function updateOrderItems() {
        orderItems.innerHTML = "";  // Clear previous items

        previousOrders.forEach(order => {
            const listItem = document.createElement("li");
            listItem.textContent = `${order.name} - ₹${order.price.toFixed(2)} x ${order.quantity} (Ordered on: ${order.date})`;
            orderItems.appendChild(listItem);
        });
    }
});