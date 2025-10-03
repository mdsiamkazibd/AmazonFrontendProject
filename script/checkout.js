import { cart, deletecart_item } from "../data/cart.js";
import { products } from "../data/products.js";
import { money } from "./money/money.js";


let cartproducthtml = "";
const ordersummery = document.querySelector(".order-summary");
let paymentsummary = document.querySelector(".payment-summary");


let totalquantity = 0;
let totalprice = 0;



cart.forEach((cartproduct) => {
    let matchingproduct;
    products.forEach((product) => {
        if(product.id === cartproduct.id){
            matchingproduct = product;
        }
    })
    totalquantity += cartproduct.quantity;
    totalprice += matchingproduct.priceCents;
    
    
    cartproducthtml += `<div class="cart-item-container cart-item-id-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${money(matchingproduct.priceCents/100)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartproduct.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id = ${matchingproduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="${matchingproduct.id}"  value = "0">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingproduct.id}" value = "4.99">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingproduct.id}"  value = "9.99">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

    
})

ordersummery.innerHTML = cartproducthtml;




paymentsummary.innerHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalquantity}):</div>
            <div class="payment-summary-money total-product-price">$0.00</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money total-delivary-cost">$0.00</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money before-tax-cost">$0.00</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money tax-cost">$0.00</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money total-all-products-cost">$0.00</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
let deletecartitem = document.querySelectorAll(".delete-quantity-link");


const totalproductprice = document.querySelector('.total-product-price')
const totalproductdelivarycost = document.querySelector('.total-delivary-cost')
const producttaxcost = document.querySelector('.tax-cost')
const beforeaddingtax = document.querySelector('.before-tax-cost');

const totalall_productcost = document.querySelector('.total-all-products-cost')


export const updatepaymentsummaryhtml =  (totalprice,totaldelivarycost,totalbeforetax,estimatedtax,totalallproductscost) => {
    totalproductprice.innerText = `$${money(totalprice/100)}`;
    totalproductdelivarycost.innerText = `$${money(totaldelivarycost)}`;
    producttaxcost.innerText = `$${money(estimatedtax/100)}`;
    beforeaddingtax.innerText = `$${money(totalbeforetax/100)}`;
    totalall_productcost.innerText = `$${money(totalallproductscost/100)}`
}

export const updatepaymentsummary = (updatehtml) => {
  let totalprice  = 0;
  let totaldelivarycost = 0;
  let totalbeforetax = 0;
  let estimatedtax = 0;
  let totalallproductscost = 0;
  
  cart.forEach((cartproduct) => {
    products.forEach((product) => {
      let productprice;
      if(product.id === cartproduct.id){
        
        totalprice += (product.priceCents*cartproduct.quantity);
      }
    })

  const delivarycost = document.querySelectorAll(`input[name="${cartproduct.id}"]`);
  let delivaryproductcost;
  delivarycost.forEach((delivaryoption) => {
       if(delivaryoption.checked){
          delivaryproductcost = +delivaryoption.value;
       }
  
  })
  totaldelivarycost += delivaryproductcost;
  totalbeforetax = totalprice + totaldelivarycost;
  estimatedtax = totalbeforetax * 0.1;
  totalallproductscost = estimatedtax + totalbeforetax;
  



  
})

updatepaymentsummaryhtml(totalprice,totaldelivarycost,totalbeforetax,estimatedtax,totalallproductscost);
}


updatepaymentsummary();
deletecartitem.forEach((deleteitem) => {
    deleteitem.addEventListener('click',()=>{
        let productId = deleteitem.dataset.productId;
        deletecart_item(productId);
        const removeitem = document.querySelector(`.cart-item-id-${productId}`);
        removeitem.remove();
        updatepaymentsummary();
        console.log(cart);


    })
})


