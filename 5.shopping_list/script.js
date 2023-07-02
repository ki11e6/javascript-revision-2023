const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
//add Item to List
function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    //validate
    if (newItem === '' || newItem.trim().length <= 0) {
        alert('Please add a valid item');
        return;
    }

    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    //linking them
    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
    //checkUI
    checkUI();
    //clear input fields
    itemInput.value = '';
}

//create button function
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    return button;
}

//create icon function
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//remove item from list
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to remove?'))
            e.target.parentElement.parentElement.remove();
    }
    checkUI();
}

//clear all items
function clearItems() {
    if (confirm('Are you sure you want to clear?'))
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    checkUI();
}

//check list clear or not
function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

//filtering items
function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.includes(text)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

//event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
