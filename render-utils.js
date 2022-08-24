export function renderGroceryItems(grocery) {

    const groceryEl = document.createElement('ul');
    groceryEl.classList.add('grocery-class');

    if (grocery.complete) {
        groceryEl.classList.add('bought');
    }

    const groceryItemEl = document.createElement('li');
    groceryItemEl.textContent = grocery.item;

    
    const quantityEl = document.createElement('li');
    quantityEl.textContent = grocery.quantity;

    groceryEl.append(groceryItemEl, quantityEl);

    return groceryEl;

}