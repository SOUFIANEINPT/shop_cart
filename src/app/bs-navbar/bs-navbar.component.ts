import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import {Observable} from 'rxjs';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
 cart$:Observable<ShoppingCart>
  constructor(private auth: AuthService,private shoppingCartService:ShoppingCartService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
async ngOnInit()
{
this.cart$ = await this.shoppingCartService.getCart()


}
}
