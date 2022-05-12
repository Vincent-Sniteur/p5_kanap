
const URL = "http://localhost:3000/api/products"; // URL for get products


// Fetch backend data for products
fetch(URL)
.then((response) => response.json())
.then((dataResponse) => getProducts(dataResponse)) // get products from database and send to getProducts function


// Get products from database and send to appendChildren function
function getProducts(data) {
    console.log(data); // show all products

    // Data array of objects uuid
    const dataId = data[0]._id

    // Data array of objects Name
    const dataName = data[0].name

    // Data array of objects IMG
    const imageUrl = data[0].imageUrl

    // Data array of objects alt
    const altTxt = data[0].altTxt

    // Data array of objects description
    const dataInfo = data[0].description

    // Data array of objects price
    const price = data[0].price

    // Data array of objects color 
    const color = data[0].colors


    // Create article > information for product card
    const h3 = createTitle(dataName) // create title
    const images = createImage(imageUrl, altTxt) // create image
    const description = createDescription(dataInfo) // create description


    // add link to product
    const link = createLink(dataId, dataName, imageUrl, altTxt, dataInfo)
    const article = createArticle()
    article.appendChild(images) // add image to article
    article.appendChild(h3) // add title to article
    article.appendChild(description)  // add description to article
    appendChildren(link, article) // add link to article  
}


// Create article for product card
function createArticle() {
    const article = document.createElement("article") // Create a element for article
    console.log(article) // show article in console ( temporaire )
    return article // return article
}


// Create product card link from data whith UUID
function createLink(dataId) {
    const link = document.createElement("a") // Create a element for link / product
    link.href = "./product.html?id=" + dataId // Create a link to product with UUID
    return link
}

// create product card from data TITLE h3
function createTitle(dataName) {
    const title = document.createElement("h3") // Create a element <h3>
    title.classList.add("productName") // add a class to title
    title.textContent = dataName // add a text to title
    return title
}

// create product card from data IMG
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img") // Create a element <img>
    image.src = imageUrl // add a link to image
    image.alt = altTxt // add a alt for image
    return image
}

// create product card from data paragraph description
function createDescription(dataInfo) {
    const description = document.createElement("p") // Create a element <p>
    description.classList.add("productDescription") // add a class to description
    description.textContent = dataInfo + "€" // add a text to description
    return description
}

// Add link to product & load items to article
function appendChildren(link, article) {
    const items = document.querySelector("#items"); // get element with id items
    if (items !== null) { // security check for items
        items.appendChild(link); // append link to item
        link.appendChild(article); // append article to link
    }
    else { // show alert if items is null
        alert("Un problème dans la base de données est survenu, nous sommes désolés pour la gêne occasionnée.")
    }
}