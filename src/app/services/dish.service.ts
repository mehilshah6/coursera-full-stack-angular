import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  
  constructor() { }
  
  getDishes() : Dish[] {
    return DISHES;
  }
  
  getDish(id : string) {
      return DISHES[Number(id)];
  }
  
  getFeaturedDish() : Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
}
