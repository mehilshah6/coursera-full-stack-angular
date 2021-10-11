import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeadersService } from '../services/leaders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  dish! : Dish;
  promotion! : Promotion;
  leader! : Leader;
  errMess! : string;
  
  constructor(private dishService : DishService,
    private promotionService : PromotionService,
    private leadersService : LeadersService,
    @Inject("baseURL") public baseURL : string) { }
    
    ngOnInit(): void {
      this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.errMess = errmess);
      this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
      this.leadersService.getFeaturedLeader().subscribe(leader => this.leader = leader);
    }
    
  }
