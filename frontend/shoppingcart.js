// javascript goes here  //
// **use localStorage

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
if (cartArray.length === 0) {
    alert("Your cart is currently empty!");
}
let cartItems = cartArray.length;

console.log(cartArray);
console.log("items in cart", cartItems);

// Create a displayCart() function
// get a product Object
// create an array entry if not existing in local Storage
// create an updateCartTotal() function
// 
// For cart items, show a pic, the name, the price, a quantity (create a function or array), line total
// and a grand total for all line items
//

function displayCart() {

    const main = document.getElementById('shoppingcart');
    
    for ( let i = 0 ; i < cartItems ; i++ ) {
    
        const cartLine = document.createElement('div');
        const imageThumb = document.createElement('img'); 
        const item = document.createElement('p');
        const price = document.createElement('p');
        const itemNum = document.createElement('p');
        const total = document.createElement('p');
        const remove = document.createElement('button');
    
        // add grand total
    
    
        let priceFmt =  (cardObj.price / 100);
        price.innerText = ('$' +  priceFmt.toFixed(2)); 
    


        

    };
}

    
// Create an updateCartNumber() function - this will add or remove the # of items appearing in the cart
//
//
// create a checkout (submit order) button to go to the confirmation page
//    - add an event listener for the click of the button
//    - see make order function below
//
// Create an event listener for the remove item button for click event & run removeFromCart() function
// Create a removeFromCart() function
//    - get the product ID
//    - retrieve local storage array
//    - use "let index = list.findindex(o => o.id == id);" to retrieve the index of the product to be deleted
//    - use the splice() method to remove it from the array, I.E. 'array'.splice(index pos, how many);
//    - update the local storage array and the shopping cart
//    - display the updated shopping cart
//
// Create a makeOrder() function
//    - gather cart data (as an array?) to be passed to confirmation page
//    - gather order form data (as an object?) to be passed the confirmation page
//    - 
