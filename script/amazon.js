import { cart } from "../data/cart.js";
import { products } from "../data/products.js";


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
                $${(product.priceCents / 100).toFixed(2)}
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
            <div class="added-to-cart">Added To Cart</div>

            
            <button class="add-cart-btn" data-product-id = "${product.id}">Add to Cart</button>
        </div>`;
})
productArea.innerHTML = productCard;


//Adding Cart Interactivity

let btns = document.querySelectorAll(".add-cart-btn");
let selectOption = document.querySelectorAll(".product-order-select");

//CartUpdate Function
const cartUpdate = (value) =>{
       let orderQ = +value;
       let cartValue= +cartQuantity.innerText;
       cartQuantity.innerText = cartValue+orderQ;
}

//Cart item Array Function

const cartitemarray = (productId , quantityValue) => {
   let matchingitem;
      if(cart.length === 0){
         cart.push(
         {
               id:productId,
               quantity:+quantityValue,
         }

         )
      }
      else{
        
        cart.forEach((i) => {
            if(i.id === productId){
                matchingitem = i;
            }
        })
           if(matchingitem){
        matchingitem.quantity += +quantityValue;
      }
      else{
        cart.push(
            {
                id:productId,
                quantity:+quantityValue,
            }
        )
      }
      }
      
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));

}


btns.forEach((btn,index)=>{
   btn.addEventListener("click",()=>{
    //cartUpdate Funcation Call.
        cartUpdate(selectOption[index].value);
        const productId = btn.dataset.productId;
    //Cartitemarray Fucntion Call for add product to the cart array.
        cartitemarray(productId,selectOption[index].value);
    })

})

