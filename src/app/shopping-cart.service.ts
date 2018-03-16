import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
private creat()
{
  return this.db.list('/shopping-carts').push({dateCreated:new Date().getTime()
  })
}
 async getCart():Promise<Observable<ShoppingCart>>
{
  let cartId=await this.getOrCreatCart()
return this.db.object('/shopping-carts/' + cartId).map(x=>new ShoppingCart(x.items)
)
}
private getItem(cartId:string,productId:string)
{
 return this.db.object("/shopping-carts/"+cartId+"/items/"+productId)
}
private  async getOrCreatCart()
{
  let cartId=localStorage.getItem('cartId')
  if(cartId)  return cartId
    let result=await this.creat()
    localStorage.setItem("cartId",result.key);
    return result.key

}
async addToCart( product:Product)
{
 this.UpdateItem(product,1)
}
async removeFromCart(product:Product)
{
 this.UpdateItem(product,-1);
}
private async UpdateItem(product:Product,change:number)
{
  let cartId=await this.getOrCreatCart()
  
  let Item$=this.getItem(cartId,product.$key)
  Item$.take(1).subscribe(Item=>{
    let quantity=(Item.quantity||0)+change
    if(quantity===0) Item$.remove()
    else Item$.update(
       {
         title:product.title,
         imageUrl:product.imageUrl,
         price:product.price,
        quantity:quantity
      })
   
  })
}
 async clearCart()
{
  let cartId=await this.getOrCreatCart()
  this.db.object('/shopping-carts/' + cartId+'/items').remove();

}
}
