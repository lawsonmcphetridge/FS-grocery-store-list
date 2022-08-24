import { getAllGroceries, createList, updateGrocery } from '../fetch-utils.js';
import { renderGroceryItems } from '../render-utils.js';




const formEl = document.getElementById('input-form');
const groceryEl = document.getElementById('current-items');




formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(formEl);

    const grocery = {
        item: data.get('input-name'),
        quantity: data.get('input-quantity'),
    };


    await createList(grocery);
    await displayGroceries();
    formEl.reset();
});





async function displayGroceries() {
    groceryEl.innerHTML = '';
    const groceries = await getAllGroceries();
    for (let grocery of groceries) {
        const groceryList = renderGroceryItems(grocery);
        groceryEl.append(groceryList);
        
        groceryList.addEventListener('click', async () => {
            await updateGrocery(grocery.id);
            displayGroceries();
        });
       
        
    }
    
}

//put this on a window . add event and make display a await
displayGroceries();