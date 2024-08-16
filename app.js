let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Greek Salad',
        image: '1.PNG',
        price: "100$"
    },
    {
        id: 2,
        name: 'Grilled Chicken Breast',
        image: '2.PNG',
        price: "120$"
    },
    {
        id: 3,
        name: 'Caesar Salad',
        image: '3.PNG',
        price: "220$"
    },
    {
        id: 4,
        name: 'Waldorf Chicken Salad',
        image: '4.PNG',
        price: "200$"
    },
    {
        id: 5,
        name: 'Tabouleh',
        image: '5.PNG',
        price: "220$"
    },
    {
        id: 6,
        name: 'Baked Lemon Herb Chicken',
        image: '6.PNG',
        price: "120$"
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button style="background-color: #dce0e1; color: black; font-weight: 900; causer: pointer;" onclick="addToCard(${key})">Add To Card</button>
            `;
        newDiv.style.border = "2px solid red";
        newDiv.style.borderRadius = "6px";
        list.appendChild(newDiv);
    });
}

initApp();


function addToCard(key) {
    if (listCards[key] == null) {
        // Copy product from list to listCard and initialize quantity
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        // If product already exists in the cart, increase its quantity
        listCards[key].quantity += 1;
    }

    // Convert the price string to a number by removing the $ and parsing it
    let price = parseFloat(products[key].price.replace('$', ''));
    listCards[key].price = listCards[key].quantity * price;

    reloadCard();
}




function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price; // Sum the total price for all items in the cart
            count += value.quantity; // Sum the total quantity of all items in the cart

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}$</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString() + '$'; // Update the total price displayed
    quantity.innerText = count; // Update the total quantity displayed
}


function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}