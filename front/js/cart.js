
//***************************************** ALERT / ERROR **************************************************//

// Alert for empty cart
function emptyCart() {
    if ( confirm( "Votre panier est vide. Retourner a l'accueil ?" )) {
        window.location.href = "index.html"
    }
}



//***************************************** ITEM / ARRAY / LOCAL STORAGE **************************************************//

const cart = []
retrieveItemsLocal()
cart.forEach((item) => displayItem(item)) // Display all items in cart ( by Array Cart )

// Get number of products in local storage and push in array cart
function retrieveItemsLocal() {
    const item = localStorage.getItem("Kanap")
    if (item === null) { // If cart is empty
        emptyCart()
    } else { // If cart is not empty
        const data = JSON.parse(item)
        data.forEach((item) => cart.push(item))
    }
}



//***************************************** DISPLAY **************************************************//

// Display product - Create HTML for each product
function displayItem(item) {
    const article = createArticle(item)
    displayArticle(article)
    totalQuantityInCart() // Display total quantity of products in cart
    totalPriceInCart() // Display total price of products in cart

    const image = createImg(item)
    const productInfo = createDivInfo(item)
    const description = createDivDescription(item)
    const setting = createDivSettings(item)
    const quantity = createDivQuantity(item)
    const deleteItem = createDivDelete(item)

    article.appendChild(image) // Add img to article
    article.appendChild(productInfo) // Add div productInfo to article
    article.appendChild(description) // Add div description to article
    productInfo.appendChild(description) // Add div description to div productInfo
    productInfo.appendChild(setting) // Add div setting to div productInfo
    setting.appendChild(quantity) // Add div quantity to div setting
    setting.appendChild(deleteItem) // Add div delete to div setting
}



//***************************************** GESTION SELECTOR & DIV **************************************************//

// Add article to section "cart_items" in cart.html
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}


// Create Global div for product information
function createDivInfo(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")

    return div
}


// Create Global div for product setting cart__item__content__settings
function createDivSettings(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings")

    return div
}



//***************************************** GESTION CREATOR **************************************************//

// Create Article for each product + dataset
function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color

    return article
}


// Create IMG & div for Image product + alt
function createImg(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    
    const image = document.createElement("img")
    image.src = item.img
    image.alt = item.alt
    div.appendChild(image)

    return div
}


// Create div for product description ( name, price, color )
function createDivDescription(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__description")

    const name = document.createElement("h2")
    name.textContent = item.name

    const color = document.createElement("p")
    color.textContent = ("Couleur: " + item.color)

    const price = document.createElement("p")
    price.textContent = (item.price + " €")
    div.appendChild(name)
    div.appendChild(color)
    div.appendChild(price)

    return div
}


// Create div for product quantity + input
function createDivQuantity(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__quantity")

    const quantity = document.createElement("p")
    quantity.textContent = ("Qté :  ")

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => {
        item.quantity = input.value
        updateQuantity(item.id) // Update quantity in local storage
    })

    div.appendChild(quantity)
    div.appendChild(input)
    return div
}


// Create div for delete product from array items
function createDivDelete(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")

    const deleteButton = document.createElement("p")
    deleteButton.classList.add("deleteItem")
    deleteButton.textContent = "Supprimer"
    deleteButton.addEventListener("click", () => {
        deleteItem(item) // Delete item from local storage + array cart + display
    })

    div.appendChild(deleteButton)
    return div
}


// Display total Price of products in cart
function totalPriceInCart() {
    const totalPrice = document.querySelector("#totalPrice")

    // Reduce cart array to get total price * quantity
    const total = cart.reduce((total, item) => total += item.price * item.quantity, 0)

    totalPrice.textContent = total
}


// Delete item in local storage
function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1) // Delete item in array
    localStorage.setItem("Kanap", JSON.stringify(cart)) // Update local storage


    const article = document.querySelector(`[data-id="${item.id}"][data-color="${item.color}"]`)
    article.remove() // Delete article Linked to item deleted


    totalQuantityInCart() // Update Live total quantity in cart
    totalPriceInCart() // Update Live total price in cart
}


// function for update quantity in local storage
function updateQuantity(item) {
    const updateItem = cart.findIndex((item) => item.id === item.id && item.color === item.color)
    localStorage.setItem("Kanap", JSON.stringify(cart)) // Update local storage

    totalQuantityInCart() // Update Live total quantity in cart
    totalPriceInCart() // Update Live total price in cart
}



// Display total quantity of products in cart
function totalQuantityInCart() {
    const totalQuantity = document.querySelector("#totalQuantity")

    let total = 0
    for(let i = 0; i < cart.length; i++) {
        total += JSON.parse(cart[i].quantity)
    }

    totalQuantity.textContent = total
}