let items = [];

// Function to update the total of checked items
function updateTotalChosen() {
    let totalAmount = items.reduce((acc, item) => {
        if (item.checkbox.checked) {
            return acc + item.total;
        }
        return acc;
    }, 0);

    // Update the totalChosen element
    document.getElementById('totalChosen').textContent = `$${totalAmount.toFixed(2)}`;
}

// Add event listener to the form
document.getElementById('fees-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('item-name').value;
    let basePrice = Number(document.getElementById('item-price').value);
    let quantity = Number(document.getElementById('quantity').value);
    
    // Get the town price
    let townSelect = document.getElementById('town-select');
    let townPrice = Number(townSelect.value);

    let payment = document.getElementById('payment-form');
    let paymentform = payment.value;
    
    // Calculate total price including town price
    let subTotal = basePrice * quantity;
    let totalPrice = subTotal + townPrice;

    let summaryItem = document.createElement('div');
    summaryItem.classList.add('summary-item');

    let summary = `
        <div>
            <p>Item Name: ${name}<br>
            Price: $${basePrice}<br>
            Quantity: ${quantity}<br>
            Sub-Total: $${subTotal.toFixed(2)}<br>    
            Shipping Fee: $${townPrice.toFixed(2)}</p>
            Payment Way: ${paymentform}</p>
        </div>
    `;

    let totalDiv = document.createElement('div');
    totalDiv.classList.add('total-amount');
    totalDiv.innerHTML = `<p>Total: $${totalPrice.toFixed(2)}</p>`;

    let editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        document.getElementById("item-name").value = name;
        document.getElementById("item-price").value = basePrice;
        document.getElementById("quantity").value = quantity;
        summaryItem.remove();
        items = items.filter(item => item.name !== name || item.basePrice !== basePrice || item.quantity !== quantity);
        updateTotalChosen(); // Update the total when an item is edited
    };

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        summaryItem.remove();
        items = items.filter(item => item.name !== name || item.basePrice !== basePrice || item.quantity !== quantity);
        updateTotalChosen(); // Update the total when an item is deleted
    };

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; 
    checkbox.classList.add('checkbox');
    checkbox.dataset.itemIndex = items.length; 
    checkbox.addEventListener('change', updateTotalChosen); // Update total when checkbox state changes
    
    let checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = 'Confirm Purchase:';

    items.push({
        name: name,
        basePrice: basePrice,
        townPrice: townPrice,
        quantity: quantity,
        total: totalPrice,
        checkbox: checkbox
    });

    summaryItem.innerHTML = summary;
    summaryItem.appendChild(totalDiv); 
    summaryItem.appendChild(checkboxLabel); 
    summaryItem.appendChild(checkbox);
    summaryItem.appendChild(editButton);
    summaryItem.appendChild(deleteButton);
    
    document.getElementById('summary').appendChild(summaryItem); 
    document.getElementById("fees-form").reset();
    updateTotalChosen(); // Update the total when a new item is added
});

document.getElementById('checkout-button').addEventListener('click', function() {
    let checkedItems = items.filter(item => item.checkbox.checked); 
    let totalAmount = checkedItems.reduce((acc, item) => acc + item.total, 0);
    
    if (checkedItems.length > 0) {
        let itemList = checkedItems.map(item => `${item.name} - $${item.total.toFixed(2)}`).join('\n');
        alert(`Checked Items:\n${itemList}\n\nTotal: $${totalAmount.toFixed(2)}`);

        // Remove checked items from the cart
        items = items.filter(item => !item.checkbox.checked);
        document.getElementById('summary').innerHTML = ''; // Clear the summary display
        
        // Rebuild the summary display with remaining items
        items.forEach(item => {
            let summaryItem = document.createElement('div');
            summaryItem.classList.add('summary-item');

            let summary = `
                <div>
                    <p>Item Name: ${item.name}<br>
                    Price: $${item.basePrice}<br>
                    Quantity: ${item.quantity}<br>
                    Sub-Total: $${(item.basePrice * item.quantity).toFixed(2)}<br>    
                    Shipping Fee: $${item.townPrice.toFixed(2)}</p>
                    Payment Way: ${item.paymentform}</p>
                </div>
            `;

            let totalDiv = document.createElement('div');
            totalDiv.classList.add('total-amount');
            totalDiv.innerHTML = `<p>Total: $${item.total.toFixed(2)}</p>`;

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox'; 
            checkbox.classList.add('checkbox');
            checkbox.dataset.itemIndex = items.indexOf(item); 
            checkbox.addEventListener('change', updateTotalChosen);

            let checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = 'Confirm Purchase:';

            summaryItem.innerHTML = summary;
            summaryItem.appendChild(totalDiv); 
            summaryItem.appendChild(checkboxLabel); 
            summaryItem.appendChild(checkbox);
            
            document.getElementById('summary').appendChild(summaryItem);
        });

        updateTotalChosen(); // Update the total after removing checked items
    } else {
        alert('Please check the checkbox for items you want to purchase.');
    }
});
