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

const main = document.getElementById('shoppingcart');
const cartHeader = document.createElement('h4');
main.classList.add('text-center')
cartHeader.innerText = 'Your Shopping Cart';
main.appendChild(cartHeader);

// cartHeader.innerText = 'Selection   Varnish   Price   Quantity   Total   Remove';
// main.appendChild(cartHeader);

let grandTotal = 0;
displayCart();

function displayCart() {

    // const main = document.getElementById('shoppingcart');
    
    
    for ( let i = 0 ; i < cartItems ; i++ ) {
    
        const cartLine = document.createElement('div');
        const imageThumb = document.createElement('img'); 
        const name = document.createElement('p');
        const finish = document.createElement('p');
        const price = document.createElement('p');
        const itemNum = document.createElement('p');
        const total = document.createElement('p');
        const remove = document.createElement('button');
        const orderTotal = document.createElement('p');
      
        cartLine.classList.add('d-flex', 'p-3', 'm-2', 'border', 'border-primary', 'col' );
        imageThumb.setAttribute('src', cartArray[i].imgUrl);
        imageThumb.setAttribute('height', 35);
        imageThumb.classList.add('pr-2', 'w-15');
        name.classList.add('px-3', 'mx-50', 'w-60', 'pt-2');
        name.setAttribute('width', 160)
        finish.classList.add('px-3', 'mx-10','w-30', 'pt-2');
        finish.setAttribute('width', 20);
        price.classList.add('px-3', 'mx-10', 'w-10', 'pt-2');
        // itemNum.classList.add('px-3');
        total.classList.add('px-3', 'w-10', 'pt-2');
        // remove.classList.add('pl-3');
        
        name.innerText = cartArray[i].name;
        finish.innerText = cartArray[i].varnish;
        let priceFmt =  (cartArray[i].unitPrice / 100);
        price.innerText = ('$' +  priceFmt.toFixed(2));
        // console.log(cartArray[i].unitPrice);
        // console.log(priceFmt);
        // add text "select quantity"
        itemNum.innerHTML = '<input class="form-control" type="number" value="1" min="1" max="99">';
        itemNum.addEventListener('change', (e) => {
            //function recacullates cart total price on quantity change
            //change inner text of total element
            //recalculate cart total
            //change innertext of grand total 
            // console.log(e.target.value)
            // totalPrice();
            let totalFmt = parseInt(cartArray[i].unitPrice / 100);
            // console.log(totalFmt);
            total.innerText = '$' + (totalFmt * e.target.value).toFixed(2);
        } )
        // console.log(itemNum);

        // total[i] = price[i] * itemNum[i];
       
        // console.log(total);
        // console.log(itemNum.value);
        // console.log(itemNum);
        
        let totalFmt = parseInt(cartArray[i].unitPrice / 100);
        // console.log(totalFmt);
        total.innerText = '$' + totalFmt.toFixed(2);

        cartLine.appendChild(imageThumb);
        cartLine.appendChild(name);
        cartLine.appendChild(finish);
        cartLine.appendChild(price);
        cartLine.appendChild(itemNum);
        cartLine.appendChild(total);
        // console.log(total);
        // cartLine.appendChild(remove);

        grandTotal = grandTotal + total[i];

        main.appendChild(cartLine);
        // innerHtml = '<br>';  ????
        // if (i = cartItems) {
            // cartLine.appendChild(grandTotal);
        // };
        

    };
    // if (i = cartItems) {
    //     cartLine.appendChild(grandTotal);
    // };
    
}
function totatPrice() {
    total.innerText = '$' + ((cartArray[i].unitPrice / 100).toFixed(2) * e.target.value);
};
    
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
