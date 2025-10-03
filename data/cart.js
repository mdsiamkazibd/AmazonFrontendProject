
export let cart= JSON.parse(localStorage.getItem('cart'));


if(!cart){
    cart = [
        {
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:4,
            
        }
    ]
}

//save the cart to localstorage

const savecarttolocal = () => {
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
        savecarttolocal()
        
        

}