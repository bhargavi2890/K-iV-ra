// Field data
const fields = {
    field1: { crop: "Wheat", area: "2 Acres", status: "Growing" },
    field2: { crop: "Corn", area: "1.5 Acres", status: "Harvested" },
    field3: { crop: "Rice", area: "3 Acres", status: "Planted" },
    field4: { crop: "Soybean", area: "2.5 Acres", status: "Irrigated" }
};

// Function to show field details
function showField(fieldId) {
    const fieldCards = document.getElementById('fieldCards');
    fieldCards.innerHTML = ''; // Clear previous details
    
    const field = fields[fieldId];
    if (field) {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <h3>Crop: ${field.crop}</h3>
            <p>Area: ${field.area}</p>
            <p>Status: ${field.status}</p>
        `;
        
        fieldCards.appendChild(card);
    }
}
