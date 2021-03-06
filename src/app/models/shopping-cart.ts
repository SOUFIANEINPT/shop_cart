import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart{
    items:ShoppingCartItem[]=[]
    constructor(public itemsMap:{[productId:string]:ShoppingCartItem})
    { 
        this.itemsMap=this.itemsMap||{}
        for(let productId in itemsMap)
        {
            let item=itemsMap[productId]
            
            this.items.push(new ShoppingCartItem({...item,$key:productId}))
        }
    }
   
    get totalItemsCount()
    {
        let count=0
        for(let productId in this.itemsMap)
        { 
          count +=this.itemsMap[productId].quantity
        
        }
        return count
    }
    getQuantity(product:Product)
  {
    
    let item=this.itemsMap[product.$key];
    return item? item.quantity: 0;
  }
  get TotalPrice( )
  {
    let count=0;

   for(let i=0;i<this.items.length;i++)
   count+=this.items[i].totalPrice
    return count
  }

}