// Retrieve shopping cart data from localStorage

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
if (cartArray.length === 0) {
    alert("Your cart is currently empty!");
}
let cartItems = cartArray.length;

console.log(cartArray);
console.log("items in cart", cartItems);

// get a product Object
// create an array entry if not existing in local Storage
// create an updateCartTotal() function
// 
// For cart items, show a pic, the name, the price, a quantity (create a function or array), line total
// and a grand total for all line items
//

const main = document.getElementById('shoppingcart');
const cartHeader = document.createElement('h4');
const cartHeader2 = document.createElement('h5');
main.classList.add('text-center')
cartHeader.innerText = 'Your Shopping Cart';
main.appendChild(cartHeader);

cartHeader2.classList.add('col-12')
cartHeader2.setAttribute('text', 'justify-space-between');
cartHeader2.innerText = 'Selection   Varnish   Price   Quantity   Total   Remove';
main.appendChild(cartHeader2);

let grandTotal = 0;
displayCart();

// Function to display shopping cart items

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
        const remBtn = document.createElement('button');
        const orderTotal = document.createElement('p');
      
        cartLine.classList.add('d-flex', 'p-2', 'border', 'border-primary');
        imageThumb.setAttribute('src', cartArray[i].imgUrl);
        imageThumb.setAttribute('height', 50);
        imageThumb.classList.add('pt-1');
        name.classList.add('px-3', 'col-3', 'col-sm-3', 'col-md-3', 'col-lg-3', 'pt-3');
        finish.classList.add('px-3', 'col-2', 'col-sm-2', 'col-md-2', 'col-lg-2', 'pt-3');
        price.classList.add('px-3', 'col', 'col-sm', 'col-md', 'col-lg', 'pt-3');
        remBtn.setAttribute('type', 'button');
        // remBtn.setAttribute('background-color', 'red');
        remBtn.classList.add('clr');
        remBtn.classList.add('px-3', 'col', 'col-sm', 'col-md', 'col-lg', 'd-xs-none');
        remBtn.innerText = 'X';
        total.classList.add('px-3', 'col', 'col-sm', 'col-md', 'col-lg', 'pt-3');
        
        remBtn.addEventListener('click', delCartLine);
        



        name.innerText = cartArray[i].name;
        finish.innerText = cartArray[i].varnish;
        let priceFmt =  (cartArray[i].unitPrice / 100);
        price.innerText = ('$' +  priceFmt.toFixed(2));
        
        itemNum.classList.add('col', 'col-sm', 'col-md', 'col-lg', 'pt-2')
        itemNum.innerHTML = '<input class="form-control" type="number" size="2" value="1" min="1" max="99">';
        itemNum.addEventListener('change', (e) => {
            //function recacullates cart total price on quantity change
            //change inner text of total element
            //recalculate cart total
            //change innertext of grand total 
            // console.log(e.target.value)
            // totalPrice();
            let totalFmt = parseInt(cartArray[i].unitPrice / 100);
            // console.log(totalFmt);
            total.innerText = ' $' + (totalFmt * e.target.value).toFixed(2);
            updateGrandTotal();
            // grandTotal = updateTotal();
            // const orderTotal = document.getElementById('grandtotal');
            // orderTotal.innerText = '$' + (grandTotal/100).toFixed(2);
        } )
        
        let totalFmt = parseInt(cartArray[i].unitPrice / 100);
        total.innerText = '$' + totalFmt.toFixed(2);
        cartLine.appendChild(imageThumb);
        cartLine.appendChild(name);
        cartLine.appendChild(finish);
        cartLine.appendChild(price);
        cartLine.appendChild(itemNum);
        cartLine.appendChild(total);
        cartLine.appendChild(remBtn);
        
        main.appendChild(cartLine);   

    };

    updateGrandTotal();
         
    // const orderTotal = document.getElementById('grandtotal');
    // orderTotal.innerText = '$' + (grandTotal/100).toFixed(2);
        
    // console.log('grandtotal:', grandTotal);

    // if (i = cartItems) {
    //     cartLine.appendChild(grandTotal);
    // };
    // localStorage.clear();
    

} 

function delCartLine(ev) {
  console.log(ev);
  ev.target.parentNode.classList.add('cool');
}

function updateGrandTotal() {
    console.log(cartArray);
    let total = 0;
    for (let i=0; i < cartArray.length; i++) {
        total = total + cartArray[i].unitPrice * cartArray[i].qty;
        console.log(cartArray[i].unitPrice);
    }
    const orderTotal = document.getElementById('grandtotal');
    orderTotal.innerText = '$' + (total/100).toFixed(2);
        // total = total.toFixed();
    console.log('total', total);
        
}

function totatPrice() {
    total.innerText = '$' + ((cartArray[i].unitPrice / 100).toFixed(2) * e.target.value);
};

const subOrder = document.getElementById('order');
const formData = document.getElementById('form-group');
// const formData = document.getElementsByClassName('form-control');

// const data = new FormData(formData);
// const values = [...data.entries()];
// const formFirstname = formData.firstName.value;

// console.log('this is the first name', formFirstname);
// console.log('This is the form data', formData);
// const formLastname = ;
// const formAddress = ;
// const formCity = ;
// const formZip = ;
// const formState = ;  


subOrder.addEventListener('click', (ev) => {
    
    ev.preventDefault();
    let productOrder = new XMLHttpRequest();            // create the instance of XMLHttprequest
    const url = "http://localhost:3000/api/furniture/order";   // create the URL string

    return new Promise((resolve, reject) => {
      
        productOrder.open('POST', url);             // open a POST api
        
        productOrder.onreadystatechange = () => {
          if (productOrder.readyState === 4) {
            if (productOrder.status === 200 || productOrder.status === 201) {
               resolve(JSON.parse(productOrder.response));    // retrieve the response if successful
            } else {
                reject(JSON.parse(productOrder.response));
            }
            const objOrdArray = JSON.parse(productOrder.response); 
                             
               
          };
        };
        productOrder.send();
    });

    console.log('');
}); 

// Create an updateCartNumber() function - this will add or remove the # of items appearing in the cart


// create a checkout (submit order) button to go to the confirmation page
//    - add an event listener for the click of the button
//    - see make order function below

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
