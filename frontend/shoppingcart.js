// javascript goes here  //
// **use localStorage

// Create a displayCart() function
// get a product Object
// create an array entry if not existing in local Storage
// create an updateCartTotal() function
// 
// For cart items, show a pic, the name, the price, a quantity (create a function or array), line total
// and a grand total for all line items
//
// Create an updateCartNumber() function - this will add or remove the # of items appearing in the cart
//
// Create a form for the name and mailing address info (all fields are required)
// add data validation to the form
//
// create a checkout (submit order) button to go to the confirmation page
//    - add an event listener for the click of the button
//    - see make order function below
//
// Create an event listener for the remove item button for click event & run removeFromCart() functio 
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
