import { cart,cartUpdate,cartitemarray} from "../data/cart.js";
import { products } from "../data/products.js";
import {money} from './money/money.js';


//Access Cart Quantity

let cartQuantity = document.querySelector(".cart-quantity");
let productArea = document.querySelector(".products-grid");

//Product suffle for random
//Fisher yates suffle algo.
for(let i = products.length-1;i>0;i--){
   const j = Math.floor(Math.random() * (i + 1));
   [products[i],products[j]] = [products[j],products[i]];
}
//add product to homepage


let productCard = "";
products.forEach((product) => {
   productCard += `<div class="product-card">
            <div class="product-img">
                <img src="${product.image}">
            </div>
            <div class="product-name">
                ${product.name}
            </div>
            <div class="product-rating">
                <img src="images/ratings/rating-${product.rating.stars * 10}.png">
                <span class="rating-quantity">${product.rating.count}</span>
            </div>
            <div class="product-price">
                $${money(product.priceCents/100)}
            </div>
            <div class="order-quantity">
                <select class="product-order-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="product-spacing"></div>
            <div class="added-to-cart"><img src= "images/icons/checkmark.png">Added To Cart</div>

            
            <button class="add-cart-btn" data-product-id = "${product.id}">Add to Cart</button>
        </div>`;
})
productArea.innerHTML = productCard;


let btns = document.querySelectorAll(".add-cart-btn");
let selectOption = document.querySelectorAll(".product-order-select");




let addcart = document.querySelectorAll(".added-to-cart")

//Add to cart button activity function.
btns.forEach((btn,index)=>{
   btn.addEventListener("click",()=>{
    //cartUpdate Funcation Call.
        
        cartUpdate(selectOption[index].value,cartQuantity);
        const productId = btn.dataset.productId;
    //Cartitemarray Fucntion Call for add product to the cart array.
        cartitemarray(productId,selectOption[index].value);

        addcart[index].style.opacity =1;
        setTimeout(() => {
            addcart[index].style.opacity = 0;
        },2000)
        selectOption[index].value = 1;

    })

})

