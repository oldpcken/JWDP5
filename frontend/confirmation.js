// JS for Confirmation Page

let total = 0;

// Retrieve shopping cart data from localStorage

let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
if (cartArray.length === 0) {
    alert("Your cart is currently empty!");
}

//grab the name from localstorage for the confirmation msg

let cust = '';
let customer = JSON.parse(localStorage.getItem('cust'));

// Grab the total price for the order

updateGrandTotal();

// Retieve the order # from the URL

const confirmation = document.getElementById('confirm');

let url1 = window.location.href;
let newUrl = new URL(url1);
let conf = newUrl.searchParams.get('conf');

confirmation.classList.add('h4', 'text-success', 'text-center');
confirmation.innerHTML = '<br/>' + customer + ', thank you for your order! <br/><br/>'; 
confirmation.innerHTML += 'The total price is $' + (total/100).toFixed(2) + '<br/><br/>'; 
confirmation.innerHTML += 'Your order number is ' + conf + '<br/><br/>';


// Clear local storage after successful server response that order has been made, reset cart total
localStorage.clear();
cartArray = [];
updateGrandTotal();

// Update the cart quantity to 0 after local storage is cleared
updateCartQty();

//---------------------------------------------
// Update the grand total of the order Function

function updateGrandTotal() {
    
    for (let i=0; i < cartArray.length; i++) {
        
        total = total + cartArray[i].unitPrice * cartArray[i].qty;
      
    }
  
}

//------------------------------
// Update Cart Quantity function

function updateCartQty() {

    let totalQty = 0
     
    const cartIcon = document.getElementsByClassName("cart-qty")[0];
    const storage = JSON.parse(localStorage.getItem('cart'));
  
    if (storage === [] || storage === null) {
        totalQty = 0;
        
    } else {
        for (let i=0; i<storage.length; i++) {
        totalQty = totalQty + parseInt(storage[i].qty)
        }
    }
  
    localStorage.setItem('qty', JSON.stringify(totalQty));
    cartIcon.innerText = totalQty;
     
}