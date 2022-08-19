// JS for Confirmation Page

let total = 0;

// Get the shopping cart totals from local storage
updateCartQty();

// Retrieve shopping cart data from localStorage

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
if (cartArray.length === 0) {
    alert("Your cart is currently empty!");
}

// Grab the total price for the order

updateGrandTotal();

// Retieve the order # from the URL

const confirmation = document.getElementById('confirm');

let url1 = window.location.href;
// console.log('url1 is ', url1);

let newUrl = new URL(url1);
// console.log('newUrl is ', newUrl);

let conf = newUrl.searchParams.get('conf');
// console.log('conf is ', conf);

// confirmation.setAttribute('align-content', 'center')
confirmation.classList.add('h3', 'text-success', 'text-center');

confirmation.innerHTML = '<br/> Thank you for your order! <br/><br/>'; 
confirmation.innerHTML += 'The total price is $' + (total/100).toFixed(2) + '<br/><br/>'; 
confirmation.innerHTML += 'Your order number is ' + conf + '<br/><br/>';


// Clear local storage after successful server response that order has been made

// localStorage.clear();

//---------------------------------------------
// Update the grand total of the order Function

function updateGrandTotal() {
  // console.log(cartArray);

   //Cycle thru cart data to calculate the grand total

  for (let i=0; i < cartArray.length; i++) {
      //Multiply each unit price by the quantity of item
      total = total + cartArray[i].unitPrice * cartArray[i].qty;

      // console.log(cartArray[i].unitPrice);
  }
  //grab html ID to append grand total data to
  // const orderTotal = document.getElementById('grandtotal');
  //format grand total $ & 2 decimal places - value put in DOM
  // orderTotal.innerText = '$' + (total/100).toFixed(2);
  
}

//------------------------------
// Update Cart Quantity function

function updateCartQty() {
    let totalQty = 0
     
    const cartIcon = document.getElementsByClassName("cart-qty")[0];
    const storage = JSON.parse(localStorage.getItem('cart'));
  
    if (storage === []) {
        totalQty = 0;
        
    } else {
        for (let i=0; i<storage.length; i++) {
          totalQty = totalQty + parseInt(storage[i].qty)
        }
    }
  
    localStorage.setItem('qty', JSON.stringify(totalQty));
    cartIcon.innerText = totalQty;
     
  }