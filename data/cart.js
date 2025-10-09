
import { deliveryoptions } from "./delivery.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { money } from "../script/money/money.js";

export let cart= JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [
        {
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:4,
            deliveryid:1,
            
        }
    ]
}

//save the cart to localstorage

export const savecarttolocal = () => {
    localStorage.setItem('cart',JSON.stringify(cart));
}

//CartUpdate Function
export const cartUpdate = () =>{
      let carttotal = 0;
      cart.forEach((cartitem) => {
        carttotal += cartitem.quantity;
      }) 
    return carttotal;
}

//Cart item Array Function

export const cartitemarray = (productId , quantityValue) => {
   let matchingitem;
      if(cart.length === 0){
         cart.push(
         {
               id:productId,
               quantity:+quantityValue,
               deliveryid:1,
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
                deliveryid:1,
            }
        )
      }
      }
      
      savecarttolocal();
      

}

export const deletecart_item = (productId) => {
        
        let tempcart = [];
        cart.forEach((cartitem) => {
            
            if(productId != cartitem.id){
                tempcart.push(cartitem);
            }
        })
        cart = tempcart;
        savecarttolocal();
        
        

}

//Some date calculation retunr Function

 export const datecalculation = (day) => {
    return dayjs().add(day,'days').format('dddd,MMMM D');

}

//delivery option html generator func.


export const generatedeliveryopitonhtml = (matchingitem,cartproduct) => {
   let html = ""
   deliveryoptions.forEach((deliveryoption) => {
   let ischecked = deliveryoption.id === cartproduct.deliveryid;
   console.log(ischecked)
   
    html += `<div class="delivery-option" data-product-id ="${matchingitem.id}" data-delivery-id ="${deliveryoption.id}">
                  <input type="radio" 
                    class="delivery-option-input"
                    name="${matchingitem.id}" ${ischecked?'checked':''}/>
                  <div>
                    <div class="delivery-option-date">
                      ${datecalculation(deliveryoption.deliverydate)}
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryoption.id === 1? "FREE" : '$'+money(deliveryoption.price/100) +' ' +'-'} Shipping
                    </div>
                  </div>
                </div>`
   })
   

  return html;
                
}

export const updatedeliveryoption = (productId,deliveryId) => {
    let matchingproduct;
    cart.forEach((cartitem) => {
           if(productId === cartitem.id){
               cartitem.deliveryid = +deliveryId;
            
           }
           
    })
    savecarttolocal()
    
 
}
