// JS for Confirmation Page

// Get the shopping cart totals from local storage
updateCartQty();





// Clear local storage after successful server response that order has been made




// localStorage.clear();

//------------------------------
// Update Cart Quantity function

function updateCartQty() {

    // Initialize quantity in local storage
    let totalQty = 0
  
    //this will calculate the # of items appearing in the cart
    console.log('The Update Cart Quantity Function is Engaged!')
  
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