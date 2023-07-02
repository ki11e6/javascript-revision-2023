const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item));
    checkUI();
}
//add Item to List
function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    //validate
    if (newItem === '' || newItem.trim().length <= 0) {
        alert('Please add a valid item');
        return;
    }
    //check edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-item');
        removeItemFromLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-item');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkItemExists(newItem)) {
            alert('Item already exists');
            return;
        }
    }
    //to DOM
    addItemToDom(newItem);
    //to Local Storage
    addItemToStorage(newItem);
    //checkUI
    checkUI();
}

//adding to DOM
function addItemToDom(newItem) {
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    //linking to DOM
    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
}

//adding to locatStorage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    //add new items to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//getting items from localStorage
function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
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
function onClickItem(e) {
    let item;
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to remove?')) {
            item = e.target.parentElement.parentElement;
            //remove item from DOM
            item.remove();
            //remove item from localStorage
            removeItemFromLocalStorage(item.textContent);
            //check UI
            checkUI();
            console.log(item.textContent);
        }
    } else if (e.target.tagName === 'LI') {
        setItemToEdit(e.target);
    }
}

//check item exists
function checkItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

//edit selected item
function setItemToEdit(item) {
    isEditMode = true;
    itemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-item'));
    item.classList.add('edit-item');
    formBtn.innerHTML = `
    <i class='fa-solid fa-pen'></i>
     Update Item
    `;
    formBtn.style.backgroundColor = 'green';
    itemInput.value = item.textContent;
}

//remove item from localStorage
function removeItemFromLocalStorage(removeItem) {
    let itemsFromStorage = getItemsFromStorage();
    //filter out items
    itemsFromStorage = itemsFromStorage.filter((item) => item !== removeItem);
    //re-set
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
//clear all items
function clearItems() {
    if (confirm('Are you sure you want to clear?'))
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    //clear all items from localStorage
    localStorage.removeItem('items');
    checkUI();
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

//check list clear or not
function checkUI() {
    //clear input fields
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    formBtn.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    Add Item
    `;
    formBtn.style.backgroundColor = 'black';
    itemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-item'));
    isEditMode = false;
}

function escap(e) {
    if (e.keyCode === 27) {
        checkUI();
    }
}

//initialize app
function init() {
    //event listeners
    itemForm.addEventListener('submit', addItem);
    itemList.addEventListener('click', onClickItem);
    itemClear.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    window.addEventListener('keydown', escap);
    checkUI();
}
init();
