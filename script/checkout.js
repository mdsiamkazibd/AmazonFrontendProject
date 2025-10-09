import { cart, deletecart_item ,generatedeliveryopitonhtml,datecalculation,updatedeliveryoption,savecarttolocal} from "../data/cart.js";

import { products } from "../data/products.js";
import { money } from "./money/money.js";
import {deliveryoptions} from "../data/delivery.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";





const updateordersummary = () => {
  let cartproducthtml = "";
   const ordersummery = document.querySelector(".order-summary");
   let paymentsummary = document.querySelector(".payment-summary");
   

let totalprice = 0;
let deliverycost = 0;
let beforetax = 0;
let tax = 0;
let totalamount = 0;


cart.forEach((cartproduct) => {
    let matchingproduct;
    products.forEach((product) => {
        if(product.id === cartproduct.id){
            matchingproduct = product;
        }
    })
    totalprice += matchingproduct.priceCents;
    let delivery_date;
    deliveryoptions.forEach((option) => {
      if(option.id == cartproduct.deliveryid){
        delivery_date = datecalculation(option.deliverydate);
        deliverycost += option.price;
      }
    })
    beforetax = deliverycost + totalprice;

    tax = beforetax * 0.1;
    totalamount = tax + beforetax;

    
    cartproducthtml += `<div class="cart-item-container cart-item-id-${matchingproduct.id}">
            <div class="delivery-date dd-id-${matchingproduct.id}">
             Delivery date : ${delivery_date}
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
                ${generatedeliveryopitonhtml(matchingproduct,cartproduct)}
                </div>
            </div>
          </div>`

    
})
ordersummery.innerHTML = cartproducthtml;

//Delete product Button Iteractivity

let deleteitem = document.querySelectorAll(".delete-quantity-link");
console.log(deleteitem)

deleteitem.forEach((deleteproduct) => {
  deleteproduct.addEventListener("click",() => {
    const deleteproductid = deleteproduct.dataset.productId;
    deletecart_item(deleteproductid);
    document.querySelector(`.cart-item-id-${deleteproductid}`).remove();
    updateordersummary();

  })
})


//delivery option add event listener functionality


document.querySelectorAll('.delivery-option').forEach((element) => {
  element.addEventListener('click',() =>{
    const {productId,deliveryId} = element.dataset;
    
    updatedeliveryoption(productId,deliveryId);
    updateordersummary();
    
    
  })
})
paymentsummary.innerHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money total-product-price">$${money(totalprice/100)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money total-delivary-cost">$${money(deliverycost/100)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money before-tax-cost">$${money(beforetax/100)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money tax-cost">$${money(tax/100)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money total-all-products-cost">$${money(totalamount/100)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

}
updateordersummary();




  



