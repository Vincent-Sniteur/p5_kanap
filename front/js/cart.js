
//***************************************** ALERT / ERROR **************************************************//
// Alert for empty cart ( désactiver pour le moment )
function emptyCart() {
    // if ( confirm( "Votre panier est vide. Retourner a l'accueil ?" )) {
    //     window.location.href = "index.html"; // Redirect to cart page
    // }
}



//***************************************** ITEM / ARRAY / LOCAL STORAGE **************************************************//

// Get products in local storage and make a array
function retrieveItemsLocal() {
    const item = localStorage.getItem("Kanap") // Get "cart" from local storage
    if (item === null) { // If cart is empty
        emptyCart() // Alert error function
    } else { // If cart is not empty
        const data = JSON.parse(item) // Parse JSON to array
        data.forEach((item) => displayItem(item))
    }
}
retrieveItemsLocal() // Retrieve items from local storage



//***************************************** DISPLAY **************************************************//

// Display product - Create HTML for each product
function displayItem(item) {
    const article = createArticle(item)// Create article element
    displayArticle(article) // Add article to cart

    const image = createImg(item) // Create img element
    const productInfo = createDivInfo(item) // Create div element
    const description = createDivDescription(item) // Create div element
    const setting = createDivSettings(item) // Create div element
    const quantity = createDivQuantity(item) // Create div element
    const deleteItem = createDivDelete(item) // Create div element

    article.appendChild(image) // Add img to article
    article.appendChild(productInfo) // Add div productInfo to article
    article.appendChild(description) // Add div description to article
    productInfo.appendChild(description) // Add div description to div productInfo
    productInfo.appendChild(setting) // Add div setting to div productInfo
    setting.appendChild(quantity) // Add div quantity to div setting
    setting.appendChild(deleteItem) // Add div delete to div setting

    console.log(article) // TODO TEMPORAIRE
}



//***************************************** GESTION SELECTOR & DIV **************************************************//

// Add article to section "cart_items" in cart.html
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article); // Add article to cart
}


// Create Global div for product information
function createDivInfo(item) {
    const div = document.createElement("div") // Create div element
    div.classList.add("cart__item__content") // Add class to div

    return div // Return div
}


// Create Global div for product setting cart__item__content__settings
function createDivSettings(item) {
    const div = document.createElement("div") // Create div element
    div.classList.add("cart__item__content__settings") // Add class to div

    return div // Return div
}



//***************************************** GESTION CREATOR **************************************************//

// Create Article for each product + dataset
function createArticle(item) {
    const article = document.createElement("article") // Create article element
    article.classList.add("cart__item") // Add class to article
    article.dataset.id = item.id
    article.dataset.color = item.color

    return article // Return article
}


// Create IMG & div for Image product + alt
function createImg(item) {
    const div = document.createElement("div") // Create div element for img
    div.classList.add("cart__item__img") // Add class to img
    
    const image = document.createElement("img"); // Create img element
    image.src = item.img // Set img src
    image.alt = item.alt // Set img alt
    div.appendChild(image) // Add img to div

    return div // Return div
}


// Create div for product description ( name, price, color )
function createDivDescription(item) {
    const div = document.createElement("div") // Create div element
    div.classList.add("cart__item__content__description") // Add class to div

    const name = document.createElement("h2") // Create h3 element
    name.textContent = item.name // Set h2 text

    const color = document.createElement("p") // Create p element
    color.textContent = ("Couleur: " + item.color) // Set p text

    const price = document.createElement("p") // Create p element
    price.textContent = (item.price + " €") // Set p text
    div.appendChild(name) // Add name to div
    div.appendChild(color) // Add color to div
    div.appendChild(price) // Add price to div

    return div
}

// Create div for product quantity + input
function createDivQuantity(item) {
    const div = document.createElement("div") // Create div element
    div.classList.add("cart__item__content__settings__quantity") // Add class to div

    const quantity = document.createElement("p") // Create p element
    quantity.textContent = ("Quantité: ") // Set p text - Quantity of product

    const input = document.createElement("input") // Create input element
    input.type = "number" // Set input type
    input.classList.add("itemQuantity") // Add class to input
    input.name = "itemQuantity" // Set input name
    input.min = "1" // Set input min
    input.max = "100" // Set input max
    input.value = item.quantity // Set input value
    input.addEventListener("change", () => {
        item.quantity = input.value // Set item quantity
        // TODO UPDATE LIVE
    })


    div.appendChild(quantity) // Add quantity to div
    div.appendChild(input) // Add input to div
    return div // Return div
}


// Create div for delete product from array items
function createDivDelete(item) {
    const div = document.createElement("div") // Create div element
    div.classList.add("cart__item__content__settings__delete") // Add class to div

    const deleteButton = document.createElement("p") // Create button element
    deleteButton.classList.add("deleteItem") // Add class to button
    deleteButton.textContent = "Supprimer" // Set button text
    deleteButton.addEventListener("click", () => {
        // TODO DELETE LIVE
    })

    div.appendChild(deleteButton) // Add button to div
    return div // Return div
}










// // Total price for cart ( EN TEST )
// function totalPrice() {
//     const cart = document.querySelector("#cart__items") // Get cart
//     const items = cart.querySelectorAll("article") // Get all items in cart
//     let total = 0 // Set total to 0
//     items.forEach((item) => { // For each item in cart
//         total += parseFloat(item.dataset.price) // Add price to total
//     })
//     return total // Return total
// }