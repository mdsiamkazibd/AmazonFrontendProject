export let cart= [
    {
        id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
    },
    {
        id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:2,
    }
];

//CartUpdate Function
export const cartUpdate = (value,cartQuantity) =>{
       let orderQ = +value;
       let cartValue= +cartQuantity.innerText;
       cartQuantity.innerText = cartValue+orderQ;
}

//Cart item Array Function

export const cartitemarray = (productId , quantityValue) => {
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
      

}

export const deletecart_item = (productId) => {
        
        let tempcart = [];
        cart.forEach((cartitem) => {
            
            if(productId != cartitem.id){
                tempcart.push(cartitem);
            }
        })
        cart = tempcart;
        console.log(cart)
}