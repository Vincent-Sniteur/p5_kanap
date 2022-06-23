
//***************************************** ALERT / ERROR **************************************************//

// Alert for empty cart
function emptyCart() {
    if ( confirm( "Votre panier est vide. Retourner a l'accueil ?" )) {
        window.location.href = "index.html"
    }
}

// Redirect to confirmation page if form is valid
function commandConfirmed() {
    alert("Votre commande a été confirmée")
}

// Function error fetching data from API
function errorFetchingData() {
    alert("Une erreur est survenue. Veuillez réessayer ultérieurement.")
}

//***************************************** ITEM / ARRAY / LOCAL STORAGE **************************************************//

// Array cart
const cart = []
retrieveItemsLocal()


// Button Send Form
const buttonOrder = document.querySelector("#order")
buttonOrder.addEventListener("click", (a) => submitForm(a))


// Add price by ID from Back-End to cart
function fetchProduct(item) {
    const id = item.id
    const url = `http://localhost:3000/api/products/${id}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            item.price = data.price
            displayItem(item)
        })
        .catch(() => errorFetchingData())

    return item
}


// Get number of products in local storage and push in array cart
function retrieveItemsLocal() {
    const item = localStorage.getItem("Kanap")
    const data = JSON.parse(item)

    // Add verification if local storage is empty
    if (data.length === 0) {
        emptyCart()
    } else {
        data.forEach((item) => cart.push(item) + fetchProduct(item))
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
function createDivInfo() {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")

    return div
}


// Create Global div for product settings
function createDivSettings() {
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

//***************************************** Function Delete / Price & Quantity **************************************************//


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
    getCartData() // Update Live valid form
}


// Function for update quantity in local storage
function updateQuantity() {
    cart.findIndex((item) => item.id === item.id && item.color === item.color)
    localStorage.setItem("Kanap", JSON.stringify(cart))

    totalQuantityInCart() // Update Live total quantity in cart
    totalPriceInCart() // Update Live total price in cart
    getCartData() // Update Live valid form
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


// Display total Price of products in cart
function totalPriceInCart() {
    const totalPrice = document.querySelector("#totalPrice")

    // Reduce cart array to get total price * quantity
    const total = cart.reduce((total, item) => total += item.price * item.quantity, 0)

    totalPrice.textContent = total
}


//***************************************** FORM **************************************************//

// Function for submit form
function submitForm(a) {
    a.preventDefault()
    
    // If cart is empty, display error message
    if (cart.length === 0) {
        emptyCart()
        return
    } 

    if (invalideForm()) return // If form is invalide, return
    if (invalideEmail()) return // If email is invalide, return

    // Fetch data for order
    const order = getCartData()
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const orderId = data.orderId
        window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
      })
      .catch((error) => errorFetchingData(error))
}


// Function for valid form get all information and return object for send to backend
function getCartData() {
    const form = document.querySelector(".cart__order__form")

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
          },
          products: getIdInCart()
        }
    return order
}


// Get id of product in cart and push it in array ID
function getIdInCart() {
    const id = []

    for(let i = 0; i < cart.length; i++) {
        id.push(cart[i].id)
    }
    return id
}


// Regex for form check if email is valid
function invalideEmail() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/

    if (regex.test(email) === false) {
      alert("L'adresse email est invalide")
      return true
    }
    return false
}

// Check if form is valid
function invalideForm() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    if (firstName === "" || lastName === "" || address === "" || city === "" || email === "") {
        alert("Veuillez remplir tous les champs")
        return true
    }
    return false
}