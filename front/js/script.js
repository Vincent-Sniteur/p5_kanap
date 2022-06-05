const URL = "http://localhost:3000/api/products/"; // URL for get products


// Fetch backend data for products
fetch(URL)
.then((response) => response.json())
.then((dataResponse) => getProducts(dataResponse))
.catch((error) => alertError())
// Get products from database and send to getProducts function


// Alert error function
function alertError() {
    alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
}


// Get products from database and send to appendChildren function
function getProducts(data) {
    for(let i = 0; i < data.length; i++) { // Loop for each product in data
        console.log("Kanap:", data[i]); // Show all products in console ( temporaire )
    // Each product = data[i] = "data"

    // Data array of objects uuid
    const dataId = data[i]._id

    // Data array of objects Name
    const dataName = data[i].name

    // Data array of objects IMG
    const imageUrl = data[i].imageUrl

    // Data array of objects alt
    const altTxt = data[i].altTxt

    // Data array of objects description
    const dataInfo = data[i].description



   // Add link to product
   const link = createLink(dataId, dataName, imageUrl, altTxt, dataInfo)


    // Create article > information for product card
    const h3 = createTitle(dataName) // Create title
    const images = createImage(imageUrl, altTxt) // Create image
    const description = createDescription(dataInfo) // Create description

    const article = document.createElement("article") // Create article for product card

    appendArticle(article, images, h3, description) // Append article product information
    appendLinkToArticle(link, article) // Add link to article  

} // End for loop
} // End getProducts function


// "appendChild" to Article for product information
function appendArticle(article, images, h3, description) {
    article.appendChild(images) // Add image to article
    article.appendChild(h3) // Add title to article
    article.appendChild(description)  // Add description to article
}


// Create link to product with id
function createLink(dataId) {
    const link = document.createElement("a") // Create a element for link / product
    link.href = "./product.html?id=" + dataId // Create a link to product with UUID
    return link
}


// Create title for product card
function createTitle(dataName) {
    const title = document.createElement("h3") // Create a element <h3>
    title.classList.add("productName") // Add a class to title
    title.textContent = dataName // Add a text to title
    return title
}


// Create img for product card
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img") // Create a element <img>
    image.src = imageUrl // Add a link to image
    image.alt = altTxt // Add a alt for image
    return image
}


// Create description for product card
function createDescription(dataInfo) {
    const description = document.createElement("p") // Create a element <p>
    description.classList.add("productDescription") // Add a class to description
    description.textContent = dataInfo + "€" // Add a text to description
    return description
}

// Add link to product & load items to article
function appendLinkToArticle(link, article) {
    const items = document.querySelector("#items"); // Create element in > items
    if (items !== null) { // Security check for items
        items.appendChild(link); // Append link to item
        link.appendChild(article); // Append article to link
    }
}