function saveToLocalStorage(name, data) {
    try {
        localStorage.setItem(name, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Failed to save "${name}" to LocalStorage:`, error);
        return false;
    }
}

function loadFromLocalStorage(name) {
    try {
        const data = localStorage.getItem(name);

        if (data === null) {
            return null;
        }

        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to load "${name}" from LocalStorage:`, error);
        return null;
    }
}



let my_cart = loadFromLocalStorage("cart")
if (my_cart === null) my_cart = {}
let count = 0;

for(const [k, v] of Object.entries(my_cart))count += v

document.getElementById('cart-count').innerText = count; 

let products = []

function addToCart(id) {

    if (my_cart[id] == undefined) my_cart[id] = 0
    my_cart[id] += 1; 
    console.log (my_cart)
    count += 1; 
    document.getElementById('cart-count').innerText = count; 
 

    saveToLocalStorage("cart", my_cart)


render_cart()


}







const card_con = document.querySelector(".pizza-grid")
function render_card(product) {
    return `<div class="pizza-card">
                <img src="${product.image}" alt="${product.name}" class="pizza-img">
                <div class="pizza-info">
                    <h3 class="pizza-title">${product.name}</h3>
                    <p class="pizza-desc">${product.desc}</p>
                    <div class="pizza-footer">
                        <span class="pizza-price">${product.price} ₴</span>
                        <button class="btn-add" onclick="addToCart(${product.id})">Додати</button>
                    </div>
                </div>
            </div>`

}

async function render_cat() {
    const resp = await fetch("data.json")
    products = await resp.json()
    card_con.innerHTML = "" 
    products.forEach((product) => card_con.innerHTML += render_card(product))
}

render_cat()





async function render_cart() {
    const resp = await fetch("data.json")
    products = await resp.json()
    const cart_products = products.filter(p=>Object.keys(my_cart).includes(String(p.id)))
    const cart_it = document.querySelector("#cart-items")

    cart_it.innerHTML = ""

    let total_pri = document.querySelector("#cart-total-amount")
    let total_amount = 0;



    cart_products.forEach(p=>{


        total_amount += p.price * my_cart[p.id]

        cart_it.innerHTML += `
    <div class="cart-item">
            <img class="cart-img" width = "60px" src=${p.image}>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${p.name}</h4>
                <div class="cart-item-meta">
                    <span class="cart-item-qty">${my_cart[p.id]}  шт.</span>
                    <span class="cart-item-price">${p.price*my_cart[p.id]}₴</span>
                </div>
            </div>
        </div>
    `
     } )
    
    
     total_pri.innerHTML = `${total_amount} ₴`

}











function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    
    
    if (cartModal.style.display === 'flex') {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = 'flex';
    }
}


function checkout() {
    alert('Замовлення прийнято в обробку!');
    localStorage.clear();
    my_cart = {}
    count = 0;
    render_cart()
    document.getElementById('cart-count').innerText = count; 
}







render_cart()

