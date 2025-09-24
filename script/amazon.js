import {products} from "../data/products.js";


//Access Cart Quantity

let cartQuantity = document.querySelector(".cart-quantity");
let productArea = document.querySelector(".products-grid");

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
                $${product.priceCents}
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

            
            <button class="add-cart-btn">Add to Cart</button>
        </div>`;
})
productArea.innerHTML = productCard;