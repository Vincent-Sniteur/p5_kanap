



//  Order number of the command if buy is valided
function commandNumber() {

    const number = Math.floor(Math.random() * 1000000)

    // add save in local storage the number created ( only if buy is valided and one time )
    localStorage.setItem("Kanap-Order", number)
    return number
}

// Display commandNumber in orderId
function displayCommandNumber() {
    const number = localStorage.getItem("Kanap-Order")
    const orderId = document.querySelector("#orderId")
    orderId.textContent = number
}
displayCommandNumber()